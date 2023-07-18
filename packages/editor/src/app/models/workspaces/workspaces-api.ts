import { rq } from '../../services';

const ENDPOINTS = {
  create: '/workspaces/create',
  get: '/workspaces'
};

export const create = (userId: string): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, {userId}, 'POST');
};

export const get = (workspaceId: string): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.get, { workspaceId });
};

export default {
  create,
  get,
};
