import { API } from './';
import type { ApiResult } from '../../services/requester';

export const load = (template) => {
  return new Promise<ApiResult>((resolve) => {
    API.load(template).then(resolve);
  });
};

export const get = () => {
  return new Promise<ApiResult>((resolve) => {
    API.get().then(resolve);
  });
};

export default {
  load,
  get,
};