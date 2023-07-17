import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface AssetsApiGet extends RegisterEndpoint {
  name: '/assets/:assetName';
};