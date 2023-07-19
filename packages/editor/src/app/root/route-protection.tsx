import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOAuth } from '../contexts/oauth';
import { RouteProtectionProps } from './root.types';
import { config as welcomeConfig } from '../pages/welcome';
import { Users } from '../models';
import { User } from '../../server/api/users';

export const RouteProtection = ({ children }: RouteProtectionProps) => {
  const defaultRoute = welcomeConfig.Path;
  const oauth = useOAuth();
  const location = useLocation();
  const user = Users.useData();
  const [progress, setProgress] = useState(0);

  const getContent = useCallback(() => {
    switch (progress) {
      case 0:
        return <div>Loading...</div>;
      case 1:
        return (
          <Navigate to={defaultRoute} replace state={{ from: location }} />
        );
      case 2:
        return children;
    }
  }, [progress]);

  useEffect(() => {
    if (oauth?.token && user.id) {
      return;
    }

    oauth?.get().then((res) => {
      if (res.error) {
        console.error(res);
        setProgress(1);
        return;
      }

      if (!res.data || !res.data.id) {
        setProgress(1);
        return;
      }

      const user = res.data as User;
      oauth.update(user);
      Users.setData(user);
      setProgress(2);
    });
  }, [user, oauth?.token]);

  return <>{getContent()}</>;
};

export default RouteProtection;
