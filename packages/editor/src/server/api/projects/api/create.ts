import type { ProjectsApiCreate } from '../projects.types';
import { blueprints } from '../../../../main/models/projects/blueprints';
import { table } from '../schema';
import { utils as dbUtils, connection } from '../../../db';

export const create: ProjectsApiCreate = {
  name: '/projects/create',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const payload = req.body;

    if (!payload.workspaceId) {
      res.send({
        error: true,
        message: 'unable to create project: workspace id required ',
        data: payload,
      });
      return;
    }

    const db = connection.get();

    if (!db) {
      res.send({
        error: true,
        message: 'unable to create project: unable to connect to DB',
        data: {
          payload,
        },
      });
      return;
    };

    const project = blueprints.get('default');
    
    project.workspaceId = payload.workspaceId;
    //@ts-ignore
    project.modules = JSON.stringify(project.modules);
    //@ts-ignore
    project.lessons = JSON.stringify(project.lessons);
    //@ts-ignore
    project.glossary = JSON.stringify(project.glossary);
    //@ts-ignore
    project.resources = JSON.stringify(project.resources);
    
    try {
      const insertRes = await dbUtils.table.insert(db, table, [project]);
      const projectId = insertRes[0][0].id;
      const [data] = await db.select().from(table).where(`${table}.id`, projectId);

      res.send({
        error: false,
        data: data,
      });
    } catch (e) {
      res.send({
        error: true,
        message: 'unexpected error while creating project',
        data: {
          trace: e,
        },
      });
    }
  },
};

export default create;