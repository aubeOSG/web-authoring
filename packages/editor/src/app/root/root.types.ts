import React from 'react';
import { rq } from '../services';

export type PageModule = {
  Path: string;
  Page: () => JSX.Element;
  useProcessor?: () => void;
  isProtected?: boolean;
};

export type Pages = {
  [key: string]: PageModule;
};

export type ModelModule = {
  init?: () => Promise<rq.ApiResult>;
};

export type Models = {
  [key: string]: ModelModule;
};

export type RouteProtectionProps = React.AllHTMLAttributes<HTMLDivElement>;
