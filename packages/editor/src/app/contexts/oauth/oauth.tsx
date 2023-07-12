import React, { createContext, useContext } from 'react';
import { OAuthProviderProps } from './ouath.types';

const oauthContext = createContext<string | null>(null);

export const useOAuth = () => {
  return useContext(oauthContext);
};

export const OAuthProvider = ({ children }: OAuthProviderProps) => {
  const token = 'dev-testing-token';

  return (
    <oauthContext.Provider value={token}>{children}</oauthContext.Provider>
  );
};

export default {
  useOAuth,
  OAuthProvider,
};
