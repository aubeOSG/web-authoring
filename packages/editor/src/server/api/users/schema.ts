import { Schema } from '../../db';

export const table: string = 'users';

export const definition: Schema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    }
  },
  {
    column: {
      name: 'createdAt',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'deletedAt',
      type: 'datetime',
    }
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
];

export default {
  table,
  definition,
};