import type { User, UsersApiSave } from '../users.types';
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
  
  try {
    const [data] = await db(table)
      .where('id', payload.id)
      .update(payload, Object.keys(payload));

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

export const save: UsersApiSave = {
  name: '/users/save',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const payload = req.body;
    const updateRes = await update(payload);

    const updateSession = () => {
      req.session.user = updateRes.data;
      req.session.save((e) => {
        if (e) {
          res.send({
            error: true,
            message: 'failed to update session',
            trace: e,
          });
          return;
        }

        res.send(updateRes);
      });
    };

    if (req.session.user?.id === updateRes.data.id) {
      updateSession();
    } else {
      res.send(updateRes);
    }
  },
};

export default save;
