import { rq } from '../../services';

const ENDPOINTS = {
  create: '/users/create',
};

export const create = (userName = 'Test User'): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, {userName}, 'POST');
};