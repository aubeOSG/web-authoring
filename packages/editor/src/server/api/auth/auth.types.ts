import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface AuthApiGet extends RegisterEndpoint {
  name: '/auth';
};

export interface AuthApiLogin extends RegisterEndpoint {
  name: '/auth/login';
};

export interface AuthApiLogout extends RegisterEndpoint {
  name: '/auth/logout';
};