import React from "react"

export type OAuthProviderProps = React.AllHTMLAttributes<HTMLDivElement>;

export type OAuthContextProps = {
  token?: string;
  update: (value: string) => void;
  remove: () => void;
};