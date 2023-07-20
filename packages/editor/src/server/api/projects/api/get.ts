import type { ProjectsApiGet } from '../projects.types';
import { table } from '../schema';
import { ProjectData } from '../../../../app/models/projects';

export const get: ProjectsApiGet = {
  name: '/projects',
  type: 'invoke',
  fn: async (req, res) => {
    const { projectId, workspaceId } = req.query;
    const db = req.db;

    if (!workspaceId && !projectId) {
      res.send({
        error: true,
        message: 'unable to get project: project or workspace id required',
      });
      return;
    }

    if (!db) {
      res.send({
        error: true,
        message: 'unable to get project: unable to connect to DB',
        data: {
          projectId,
          workspaceId,
        },
      });
      return;
    };

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