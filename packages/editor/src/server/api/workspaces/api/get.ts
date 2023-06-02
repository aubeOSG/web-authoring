import type { WorkspacesApiGet } from '../workspace.types';
import { table } from '../schema';
import { connection } from '../../../db';

export const get: WorkspacesApiGet = {
  name: '/workspaces',
  type: 'invoke',
  fn: async (req, res) => {
    const { workspaceId } = req.query;

    if (!workspaceId) {
      res.send({
        error: true,
        message: 'unable to get workspace: id required',
      });
      return;
    }

    const db = connection.get();

    try {
      const [data] = await await db.select().from(table).where(`${table}.id`, workspaceId);

      res.send({
        error: false,
        data,
      });
    } catch (e) {
      res.send({
        error: true,
        message: 'unable to get workspace: unexpected error',
        data: {
          trace: e,
          query: req.query,
        },
      });
    }
  },
};

export default get;