// import type { ProjectsApiSave } from '../projects.types';
// import type { ProjectData } from '../../../../app/models/projects';
import { table } from '../schema';
import { connection } from '../../../db';

export const update = async (payload) => {
  if (!payload.id) {
    return {
      error: true,
      message: 'unable to save workspace: id is required',
      data: payload,
    };
  }

  const db = connection.get();

  if (!db) {
    return {
      error: true,
      message: 'unable to save workspace: unable to connect to DB',
      data: {
        payload,
      },
    };
  }

  const { ...workspaceData } = payload

  try {
    //@ts-ignore
    const [data] = await db(table)
      .where('id', workspaceData.id)
      .update(workspaceData, Object.keys(workspaceData));

    return {
      error: false,
      data,
    };
  } catch (e) {
    return {
      error: true,
      message: 'unexpected error while saving workspace',
      data: {
        trace: e,
      },
    };
  }
};

export const save = {
  name: '/workspaces/save',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const payload = req.body;
    const updateRes = await update(payload);

    res.send(updateRes);
  },
};

export default save;
