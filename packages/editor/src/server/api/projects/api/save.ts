import type { ProjectsApiSave } from '../projects.types';
import type { ProjectData } from '../../../../app/models/projects';
import { table } from '../schema';
import { connection } from '../../../db';

export const update = async (payload: ProjectData) => {
  if (!payload.id) {
    return {
      error: true,
      message: 'unable to save project: id is required',
      data: payload,
    };
  }
  
  if (!payload.workspaceId) {
    return {
      error: true,
      message: 'unable to save project: workspace id required',
      data: payload,
    };
  }

  const db = connection.get();

  if (!db) {
    return {
      error: true,
      message: 'unable to save project: unable to connect to DB',
      data: {
        payload,
      },
    };
  };

  const { modules, lessons, glossary, resources, ...projectData } = payload;
  const project = {
    modules: JSON.stringify(modules),
    lessons: JSON.stringify(lessons),
    glossary: JSON.stringify(glossary),
    resources: JSON.stringify(resources),
    ...projectData,
  };

  try {
    const [data] = await db(table).where('id', project.id).update(project, Object.keys(project));

    return {
      error: false,
      data,
    };
  } catch (e) {
    return {
      error: true,
      message: 'unexpected error while saving project',
      data: {
        trace: e,
      },
    };
  }
};

export const save: ProjectsApiSave = {
  name: '/projects/save',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const payload = req.body as ProjectData;
    const updateRes = await update(payload);

    res.send(updateRes);
  },
};

export default save;