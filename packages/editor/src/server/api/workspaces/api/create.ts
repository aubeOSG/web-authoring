import type { WorkspacesApiCreate } from '../workspace.types';
import { table } from '../schema';

export const create: WorkspacesApiCreate = {
  name: '/workspaces/create',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {

  }
};

export default create;