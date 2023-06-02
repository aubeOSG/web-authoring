import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface WorkspacesApiCreate extends RegisterEndpoint {
  name: '/workspaces/create';
};