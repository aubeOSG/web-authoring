import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface WorkspacesApiCreate extends RegisterEndpoint {
  name: '/workspaces/create';
};

export interface WorkspacesApiGet extends RegisterEndpoint {
  name: '/workspaces';
};