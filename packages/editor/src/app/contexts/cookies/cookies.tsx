import React, { createContext, useContext } from 'react';
import CookiesService from './service';
import { CookiesProviderProps, CookiesServiceClass } from './cookies.types';

const CookiesContext = createContext<CookiesServiceClass | null>(null);

export const useCookies = () => {
  return useContext(CookiesContext);
};

export const CookiesProvider = ({ children }: CookiesProviderProps) => {
  const cookies = new CookiesService();

  return (
    <CookiesContext.Provider value={cookies}>
      {children}
    </CookiesContext.Provider>
  );
};

export default {
  useCookies,
  CookiesProvider,
};
