import type { UsersApiGet, User } from '../users.types';
import { table } from '../schema';

export const get: UsersApiGet = {
  name: '/users',
  type: 'invoke',
  fn: async (req, res) => {
    const { id } = req.query;
    const db = req.db;

    if (!id) {
      res.send({
        error: true,
        message: 'unable to get user: id required',
      });
      return;
    }

    if (!db) {
      res.send({
        error: true,
        message: 'unable to get user: unable to connect to DB',
        data: {
          id,
        },
      });
      return;
    };

    try {
      const data:Array<User> = await db.select().from(table).where(`${table}.id`, id);
      console.log('');
      console.log('');
      console.log('getting user', id);
      console.log('');
      console.log('');
      res.send({
        error: false,
        data: data[0],
      });
    } catch (e) {
      res.send({
        error: true,
        message: 'unable to get user: unexpected error',
        data: {
          trace: e,
          query: req.query,
        },
      });
    }
  },
};

export default get;