import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface UsersApiGet extends RegisterEndpoint {
  name: '/users';
};

export interface UsersApiCreate extends RegisterEndpoint {
  name: '/users/create';
};

export interface UsersApiSave extends RegisterEndpoint {
  name: '/users/save';
};

export type User = {
  id: string;
  createdAt: string;
  deletedAr: string;
  name: string;
  avatar: string;
  hasPublished: boolean;
};