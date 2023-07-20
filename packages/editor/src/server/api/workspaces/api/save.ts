import { WorkspacesApiSave } from '../workspace.types';
import { table } from '../schema';

export const update = async (req) => {
  const payload = req.body;
  const db = req.db;

  if (!payload.id) {
    return {
      error: true,
      message: 'unable to save workspace: id is required',
      data: payload,
    };
  }

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

export const save: WorkspacesApiSave = {
  name: '/workspaces/save',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const updateRes = await update(req);

    res.send(updateRes);
  },
};

export default save;
