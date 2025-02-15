import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface AssetsApiGet extends RegisterEndpoint {
  name: '/assets/:workspace/:asset';
};

export interface AssetsApiPut extends RegisterEndpoint {
  name: '/assets';
  method: 'POST';
};