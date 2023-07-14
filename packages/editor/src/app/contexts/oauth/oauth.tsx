import React, { createContext, useContext, useCallback, useState } from 'react';
import { OAuthProviderProps, OAuthContextProps } from './ouath.types';
import { useCookies } from '../cookies';

const oauthContext = createContext<OAuthContextProps | null>(null);
const defaultExpiry = 1000 * 60 * 60 * 24 * 7 - 1000;

export const useOAuth = () => {
  return useContext(oauthContext);
};

export const OAuthProvider = ({ children }: OAuthProviderProps) => {
  const cookies = useCookies();
  const [token, setToken] = useState(cookies?.get('accessToken'));

  console.log('cookie::oauth init', token);

  const update = useCallback(
    (value: string) => {
      console.log('cookie:token-update', value);
      setToken(value);
      cookies?.put('accessToken', value, defaultExpiry);
    },
    [token]
  );

  const remove = useCallback(() => {
    setToken(undefined);
    cookies?.remove('accessToken');
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
