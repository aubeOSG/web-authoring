import type { UsersApiCreate } from '../users.types';
import { table } from '../schema';
import { utils as dbUtils, connection } from '../../../db';

export const create: UsersApiCreate = {
  name: '/users/create',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const db = connection.get();
    const user = {
      name: 'test user'
    };

    try {
      const userIds = dbUtils.table.insert(db, table, [user]);

      res.send({
        error: false,
        data: {
          userId: userIds[0],
        },
      });
    } catch (e) {
      res.send({
        error: true,
        message: 'unexpected error while creating user',
        data: {
          trace: e,
        },
      });
    }
  }
};

export default create;