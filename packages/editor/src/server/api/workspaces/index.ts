import { table, definition } from './schema';
import seed from './seed';
import api from './api';

export * from './schema';
export {
  seed,
  api,
}

export default {
  table,
  definition,
  seed,
  api,
};
