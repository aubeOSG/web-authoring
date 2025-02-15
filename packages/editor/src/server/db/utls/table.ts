import type { Knex } from 'knex';
import type { Schema, Config } from '../db.types';
import { List, hasProp } from '@scrowl/utils';

export const drop = (
  db: Knex,
  table: string,
) => {
  console.log(`dropping table ${table}`);
  return db.raw(`DROP TABLE IF EXISTS ${table} CASCADE`);
};

const uuid = (
  db: Knex,
  table: Knex.TableBuilder,
  col = 'id'
) => {
  switch (col) {
    case 'id':
      table.uuid(col)
        .primary()
        .notNullable()
        .unique()
        .defaultTo(db.raw('uuid_generate_v4()'));
      break;
    default:
      table.uuid(col)
        .notNullable()
        .unique()
        .defaultTo(db.raw('uuid_generate_v4()'));
      break;
  }
};

const foreignKey = (
  table: Knex.TableBuilder,
  opts: {
    col: string,
    table: string,
  }
) => {
  table.foreign(opts.col).references(`${opts.table}.id`);
};

export const create = (
  db: Knex,
  table: string,
  schema: Schema,
  config: Config
) => {
  return db
    .schema
    .withSchema(config.schema)
    .createTable(table, (data: Knex.TableBuilder) => {
      const colCnt = schema.length;
      let i: number = 0;
      let col = '';

      while (i < colCnt) {
        col = schema[i].column.name;

        switch (schema[i].column.type) {
          case 'uuid':
            uuid(db, data, col);
            break;
          case 'string':
            data.string(col).defaultTo('');
            break;
          case 'integer':
            data.integer(col);
            break;
          case 'decimal':
            data.decimal(col);
            break;
          case 'foreign':
            data.uuid(col);
            foreignKey(data, {
              col,
              table: schema[i].column.table || '',
            });
            break;
          case 'datetime':
            data.datetime(col).defaultTo(db.fn.now());
            break;
          case 'json':
            data.json(col);
            break;
          case 'boolean':
            if (hasProp(schema[i].column, 'defaultValue')) {
              data.boolean(col).notNullable().defaultTo(schema[i].column.defaultValue);
            } else {
              data.boolean(col).notNullable().defaultTo(false);
            }
            break;
        }

        i++;
      }
    });
};

export const insert = (
  db: Knex,
  table: string,
  data: Array<{}>
) => {
  const addEntry = (entry) => {
    return db(table).returning('id').insert(entry);
  };

  return List.asyncForEach(data, addEntry);
};

export default {
  drop,
  create,
  insert,
};