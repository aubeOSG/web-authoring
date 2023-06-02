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
      const insertRes = await dbUtils.table.insert(db, table, [user]);
      const userId = insertRes[0][0].id;
      const data = await db.select().from(table).where(`${table}.id`, userId)[0];

      res.send({
        error: false,
        data: data,
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