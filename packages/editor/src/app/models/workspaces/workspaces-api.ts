import { rq } from '../../services';

const ENDPOINTS = {
  create: '/workspaces/create',
};

export const create = (userId: string): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, {userId}, 'POST');
};