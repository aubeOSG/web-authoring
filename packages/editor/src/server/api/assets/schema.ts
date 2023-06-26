import { Schema } from '../../db';
import { schema as workspaceSchema } from '../workspaces';

export const table: string = 'assets';

export const definition: Schema = [
  {
    column: {
      name: 'id',
      type: 'uuid',
    }
  },
  {
    column: {
      name: 'workspaceId',
      type: 'foreign',
      table: workspaceSchema.table,
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
      name: 'title',
      type: 'string',
    }
  },
  {
    column: {
      name: 'isResource',
      type: 'boolean',
    },
  },
  {
    column: {
      name: 'description',
      type: 'string',
    },
  },
  {
    column: {
      name: 'filename',
      type: 'string',
    }
  },
  {
    column: {
      name: 'ext',
      type: 'string',
    }
  },
  {
    column: {
      name: 'type',
      type: 'string',
    }
  },
  {
    column: {
      name: 'size',
      type: 'integer',
    }
  },
  {
    column: {
      name: 'sourceExt',
      type: 'string',
    }
  },
  {
    column: {
      name: 'sourceFilename',
      type: 'string',
    }
  },
];

export const schema = {
  table,
  definition,
};

export default schema;