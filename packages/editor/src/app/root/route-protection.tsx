import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOAuth } from '../contexts/oauth';
import { RouteProtectionProps } from './root.types';
import { Path as defaultRoute } from '../pages/welcome';

export const RouteProtection = ({ children }: RouteProtectionProps) => {
  const token = useOAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={defaultRoute} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RouteProtection;
