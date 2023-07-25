import { User } from '../../../server/api/users';
import { rq } from '../../services';

const ENDPOINTS = {
  create: '/users/create',
  save: '/users/save',
  get: '/users',
};

export const create = (userName = 'Test User'): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, {userName}, 'POST');
};

export const save = (user: User): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.save, user, 'POST');
};

export const get = (id: string): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.get, { id });
};

export default {
  create,
  save,
  get,
};
