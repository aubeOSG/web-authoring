import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface WorkspacesApiCreate extends RegisterEndpoint {
  name: '/workspaces/create';
};

export interface WorkspacesApiSave extends RegisterEndpoint {
  name: '/workspaces/save';
};

export interface WorkspacesApiGet extends RegisterEndpoint {
  name: '/workspaces';
};