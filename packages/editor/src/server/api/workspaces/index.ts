import Schema from './schema';
import Seed from './seed';
import Api from './api';

export * from './workspace.types';

export const schema = Schema;
export const api = Api;
export const seed = Seed;

export default {
  schema,
  seed,
  api,
};
