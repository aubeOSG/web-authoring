import type { Knex } from 'knex';
import workspaces from '../api/workspaces';
import projects from '../api/projects';
import assets from '../api/assets';
import users from '../api/users';

export const seed = (db: Knex) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('');
      console.log('');
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
      console.log('');
      console.log('');
      resolve({
        completed: true,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default seed;