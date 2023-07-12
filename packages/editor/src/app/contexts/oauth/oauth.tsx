import React, { createContext, useContext, useCallback, useState } from 'react';
import { OAuthProviderProps, OAuthContextProps } from './ouath.types';
import { useCookies } from '../cookies';

const oauthContext = createContext<OAuthContextProps | null>(null);

export const useOAuth = () => {
  return useContext(oauthContext);
};

export const OAuthProvider = ({ children }: OAuthProviderProps) => {
  const cookies = useCookies();
  const [token, setToken] = useState(cookies?.get('accessToken'));

  const update = useCallback(
    (value: string) => {
      setToken(value);
    },
    [token]
  );

  const remove = useCallback(() => {
    setToken(undefined);
  }, [token]);

  const value = {
    token,
    update,
    remove,
  };

  return (
    <oauthContext.Provider value={value}>{children}</oauthContext.Provider>
  );
};

export default {
  useOAuth,
  OAuthProvider,
};
