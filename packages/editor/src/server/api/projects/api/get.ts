import type { ProjectsApiGet } from '../projects.types';
import { table } from '../schema';
import { connection } from '../../../db';
import { ProjectData } from '../../../../app/models/projects';

export const get: ProjectsApiGet = {
  name: '/projects',
  type: 'invoke',
  fn: async (req, res) => {
    const { projectId, workspaceId } = req.query;

    if (!workspaceId && !projectId) {
      res.send({
        error: true,
        message: 'unable to get project: project or workspace id required',
      });
      return;
    }

    const db = connection.get();

    try {
      let data:Array<ProjectData> = []

      if (workspaceId) {
        data = await db.select().from(table).limit(1).where(`${table}.workspaceId`, workspaceId).orderBy('createdAt', 'desc');
      } else {
        data = await db.select().from(table).where(`${table}.id`, projectId);
      }

      res.send({
        error: false,
        data: data[0],
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