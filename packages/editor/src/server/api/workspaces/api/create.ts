import type { WorkspacesApiCreate } from '../workspace.types';
import { table } from '../schema';
import { utils as dbUtils } from '../../../db';

export const create: WorkspacesApiCreate = {
  name: '/workspaces/create',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const payload = req.body;
    const db = req.db;

    if (!payload.userId) {
      res.send({
        error: true,
        message: 'unable to create workspace: user id required',
        data: payload,
      });
      return;
    }

    if (!db) {
      res.send({
        error: true,
        message: 'unable to create workspace: unable to connect to DB',
        data: {
          payload,
        },
      });
      return;
    };
  

    const workspace = {
      userId: payload.userId,
      settings: {
        paneWidth: 300,
        activeTab: 'tab-outline',
        activeLessonId: -1,
      },
    };

    try {
      const insertRes = await dbUtils.table.insert(db, table, [workspace]);
      const workspaceId = insertRes[0][0].id;
      const [data] = await db.select().from(table).where(`${table}.id`, workspaceId);

      res.send({
        error: false,
        data: data,
      });
    } catch (e) {
      res.send({
        error: true,
        message: 'unexpected error while creating workspace',
        data: {
          trace: e,
        },
      });
    }
  }
};

export default create;