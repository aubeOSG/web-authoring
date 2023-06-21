import { Schema } from '../../db';
import { schema as workspaceSchema } from '../workspaces';

export const table: string = 'projects';

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
      name: 'workspaceId',
      type: 'foreign',
      table: workspaceSchema.table,
    }
  },
  {
    column: {
      name: 'meta',
      type: 'json',
    }
  },
  {
    column: {
      name: 'scorm',
      type: 'json',
    }
  },
  {
    column: {
      name: 'modules',
      type: 'json',
    }
  },
  {
    column: {
      name: 'lessons',
      type: 'json',
    }
  },
  {
    column: {
      name: 'glossary',
      type: 'json',
    }
  },
  {
    column: {
      name: 'resources',
      type: 'json',
    }
  },
];

export default {
  table,
  definition,
};