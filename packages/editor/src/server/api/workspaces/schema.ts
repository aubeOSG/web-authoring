import { Schema } from '../../db';
import { table as userTable } from '../users';

export const table: string = 'workspaces';

export const schema: Schema = [
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
      name: 'userId',
      type: 'foreign',
      table: userTable,
    },
  },
  {
    column: {
      name: 'deletedAt',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'openedAt',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'updatedAt',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'versions',
      type: 'json',
    }
  },
  {
    column: {
      name: 'publishing',
      type: 'json',
    }
  },
];

export default {
  table,
  schema,
};