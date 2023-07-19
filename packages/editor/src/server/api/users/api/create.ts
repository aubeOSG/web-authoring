import type { UsersApiCreate } from '../users.types';
import { table } from '../schema';
import { utils as dbUtils, connection } from '../../../db';

export const create: UsersApiCreate = {
  name: '/users/create',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    // const payload = req.body;
    const db = connection.get();

    if (!db) {
      res.send({
        error: true,
        message: 'unable to create user: unable to connect to DB',
      });
      return;
    };
  

    const user = {
      name: 'test user',
      settings: {
        hasPublished: false,
        reducedAnimations: true,
        theme: 'light',
      },
    };

    try {
      const insertRes = await dbUtils.table.insert(db, table, [user]);
      const userId = insertRes[0][0].id;
      const [data] = await db.select().from(table).where(`${table}.id`, userId);

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