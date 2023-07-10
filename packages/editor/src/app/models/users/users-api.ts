import { rq } from '../../services';

const ENDPOINTS = {
  create: '/users/create',
  save: '/users/save',
};

export const create = (userName = 'Test User'): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, {userName}, 'POST');
};

export const save = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.save, data, 'POST');
};