import type { WorkspacesApiGet } from '../workspace.types';
import { table } from '../schema';

export const get: WorkspacesApiGet = {
  name: '/workspaces',
  type: 'invoke',
  fn: async (req, res) => {
    const { workspaceId } = req.query;
    const db = req.db;

    if (!workspaceId) {
      res.send({
        error: true,
        message: 'unable to get workspace: id required',
      });
      return;
    }

    if (!db) {
      res.send({
        error: true,
        message: 'unable to get workspace: unable to connect to DB',
        data: {
          workspaceId,
        },
      });
      return;
    };
  

    try {
      const [data] = await db.select().from(table).where(`${table}.id`, workspaceId);

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