import type { Knex } from 'knex';
import {
  workspaces,
  projects,
  assets,
  users
} from '../api/entities';

export const generate = (db: Knex) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('seeding DB');
      console.log('adding uuid support');
      await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      await users.seed(db);
      console.log('seeding workspaces');
      await workspaces.seed(db);
      console.log('seeding projects');
      await projects.seed(db);
      console.log('seeding assets');
      await assets.seed(db);
      console.log('finished');
      resolve({
        completed: true,
      });
    } catch (e) {
      reject(e);
    }
  });
};