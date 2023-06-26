import type { RegisterEndpoint } from '../../services';

export interface EndpointsApiGet extends Omit<RegisterEndpoint, 'name'> {
  name: '/endpoints';
};

export type EndpointsApi = {
  get: EndpointsApiGet;
};