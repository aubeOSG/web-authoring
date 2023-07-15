import { User } from '../../../server/api/users';
import { rq } from '../../services';

const ENDPOINTS = {
  get: '/auth',
  login: '/auth/login',
  logout: '/auth/logout',
};

export const get = (): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.get);
};

export const login = (user: User): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.login, { user }, 'POST');
};

export const logout = (): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.login);
};

export default {
  get,
  login,
  logout,
};