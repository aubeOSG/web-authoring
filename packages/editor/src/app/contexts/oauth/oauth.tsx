import React, { createContext } from 'react';
import { OAuthProviderProps } from './ouath.types';

export const useOAuth = createContext<string | null>(null);

export const OAuthProvider = ({ children }: OAuthProviderProps) => {
  const token = 'dev-testing-token';

  return <useOAuth.Provider value={token}>{children}</useOAuth.Provider>;
};

export default {
  useOAuth,
  OAuthProvider,
};
