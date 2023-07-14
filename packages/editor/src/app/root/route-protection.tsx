import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOAuth } from '../contexts/oauth';
import { RouteProtectionProps } from './root.types';
import { Path as defaultRoute } from '../pages/welcome';
import { Users } from '../models';

export const RouteProtection = ({ children }: RouteProtectionProps) => {
  const oauth = useOAuth();
  const location = useLocation();
  const user = Users.useData();
  const [progress, setProgress] = useState(0);

  if (!oauth?.token) {
    return <Navigate to={defaultRoute} replace state={{ from: location }} />;
  }

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
    console.log('cookie::user', user.id);
    console.log('cookie::token', oauth.token);

    if (!oauth.token) {
      setProgress(1);
      return;
    }

    if (user.id) {
      setProgress(2);
      return;
    }

    Users.get(oauth.token).then((res) => {
      if (res.error) {
        return;
      }

      oauth.update(res.data.id);
    });
  }, [user, oauth.token]);

  return <>{getContent()}</>;
};

export default RouteProtection;
