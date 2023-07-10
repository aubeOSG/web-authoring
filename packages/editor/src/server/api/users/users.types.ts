import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface UsersApiCreate extends RegisterEndpoint {
  name: '/users/create';
};

export type User = {
  id: string;
  createdAt: string;
  deletedAr: string;
  name: string;
  avatar: string;
  hasPublished: boolean;
};