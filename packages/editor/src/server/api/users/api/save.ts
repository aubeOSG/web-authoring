import type { User } from '../users.types';
// import type { ProjectData } from '../../../../app/models/projects';
import { table } from '../schema';
import { connection } from '../../../db';

export const update = async (payload: User) => {
  if (!payload.id) {
    return {
      error: true,
      message: 'unable to save user: id is required',
      data: payload,
    };
  }

  const db = connection.get();

  if (!db) {
    return {
      error: true,
      message: 'unable to save user: unable to connect to DB',
      data: {
        payload,
      },
    };
  }

  const { ...userData } = payload;

  console.log('USER DATA: ', userData);

  const user = {
    ...userData,
  };

  try {
    const [data] = await db(table)
      .where('id', user.id)
      .update(user, Object.keys(user));

    return {
      error: false,
      data,
    };
  } catch (e) {
    return {
      error: true,
      message: 'unexpected error while saving user',
      data: {
        trace: e,
      },
    };
  }
};

export const save = {
  name: '/users/save',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const payload = req.body;
    const updateRes = await update(payload);

    res.send(updateRes);
  },
};

export default save;
