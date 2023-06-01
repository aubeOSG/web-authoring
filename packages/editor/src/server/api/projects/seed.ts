import { Knex } from 'knex';
import { connection, utils } from '../../db';
import { table, definition } from './schema';

export const seed = (db: Knex) => {
  return new Promise(async(resolve, reject) => {
    try {
      await utils.table.drop(db, table);
      await utils.table.create(db, table, definition, connection.config);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

export default seed;