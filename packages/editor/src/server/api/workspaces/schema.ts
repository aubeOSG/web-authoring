import { Schema } from '../../db';
import { schema as userSchema } from '../users';

export const table: string = 'workspaces';

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
      name: 'userId',
      type: 'foreign',
      table: userSchema.table,
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
  definition,
};