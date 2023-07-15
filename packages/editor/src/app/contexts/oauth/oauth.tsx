import React, { createContext, useContext, useCallback, useState } from 'react';
import { OAuthProviderProps, OAuthContextProps } from './ouath.types';
import { useCookies } from '../cookies';
import API from './oauth-api';
import { User } from '../../../server/api/users';

const oauthContext = createContext<OAuthContextProps | null>(null);
const defaultExpiry = 1000 * 60 * 60 * 24 * 7 - 1000;

export const useOAuth = () => {
  return useContext(oauthContext);
};

export const OAuthProvider = ({ children }: OAuthProviderProps) => {
  const cookies = useCookies();
  const [token, setToken] = useState(cookies?.get('userToken'));

  const update = useCallback(
    (user: User) => {
      setToken(user.id);
      cookies?.put('userToken', user.id, defaultExpiry);
    },
    [token]
  );

  const remove = useCallback(() => {
    setToken(undefined);
    cookies?.remove('accessToken');
  }, [token]);

  const get = useCallback(() => {
    return API.get();
  }, []);

  const login = useCallback((user: User) => {
    update(user);
    return API.login(user);
  }, []);

  const logout = useCallback(() => {
    return API.logout();
  }, []);

  const value = {
    token,
    update,
    remove,
    get,
    login,
    logout,
  };

  return (
    <oauthContext.Provider value={value}>{children}</oauthContext.Provider>
  );
};

export default {
  useOAuth,
  OAuthProvider,
};
