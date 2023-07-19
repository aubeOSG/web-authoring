import { Schema } from '../../db';

export const table: string = 'users';

export const definition: Schema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    },
  },
  {
    column: {
      name: 'createdAt',
      type: 'datetime',
    },
  },
  {
    column: {
      name: 'deletedAt',
      type: 'datetime',
    },
  },
  {
    column: {
      name: 'name',
      type: 'string',
    },
  },
  {
    column: {
      name: 'avatar',
      type: 'string',
    },
  },
  {
    column: {
      name: 'hasPublished',
      type: 'boolean',
      defaultValue: false,
    },
  },
];

export default {
  table,
  definition,
};