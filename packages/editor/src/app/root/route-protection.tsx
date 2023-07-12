import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useOAuth } from '../contexts/oauth';
import { RouteProtectionProps } from './root.types';
import { Path as defaultRoute } from '../pages/welcome';

export const RouteProtection = ({ children }: RouteProtectionProps) => {
  const token = useContext(useOAuth);

  if (!token) {
    return <Navigate to={defaultRoute} replace />;
  }

  return <>{children}</>;
};

export default RouteProtection;
