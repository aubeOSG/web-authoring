import { rq } from '../../services';

const ENDPOINTS = {
  load: '/templates/load',
  get: '/templates/get',
};

export const load = (template) => {
  console.log('loading', template);
  return rq.invoke(ENDPOINTS.load, { template }, 'POST');
};

export const get = () => {
  return rq.invoke(ENDPOINTS.get);
}

export default {
  get,
  load,
};
