import { Schema } from '../../db';
import { table as workspaceTable } from '../workspaces';

export const table: string = 'projects';

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
      name: 'deletedAt',
      type: 'datetime',
    }
  },
  {
    column: {
      name: 'workspaceId',
      type: 'foreign',
      table: workspaceTable,
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
      name: 'slides',
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
  schema,
};