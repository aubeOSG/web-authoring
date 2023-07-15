import React from "react"
import { User } from "../../../server/api/users";
import { ApiResult } from '../../services/requester'

export type OAuthProviderProps = React.AllHTMLAttributes<HTMLDivElement>;

export type OAuthContextProps = {
  token?: string;
  update: (user: User) => void;
  remove: () => void;
  get: () => Promise<ApiResult>;
  login: (user: User) => Promise<ApiResult>;
  logout: () => Promise<ApiResult>;
};