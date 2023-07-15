import React from "react"

export interface CookiesServiceClass {
  put: (value: any, key?: string, expiry?: string | number) => void;
  get: (key?: string) => any;
  remove: (key: string) => void;
}

export type CookiesProviderProps = React.AllHTMLAttributes<HTMLDivElement>;