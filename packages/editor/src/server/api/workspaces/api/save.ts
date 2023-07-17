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

  const { ...workspaceData } = payload;
  const workspace = {
    ...workspaceData,
  };

  try {
    //@ts-ignore
    const [data] = await db(table)
      .where('id', workspace.id)
      .update(workspace, Object.keys(workspace));

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
    console.log('req.body: ', req.body);
    const payload = req.body;
    const updateRes = await update(payload);

    res.send(updateRes);
  },
};

export default save;
