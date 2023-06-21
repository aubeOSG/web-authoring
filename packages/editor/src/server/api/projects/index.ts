import Api from './api';
import Schema from './schema';
import Seed from './seed';

export * from './projects.types';

export const schema = Schema;
export const api = Api;
export const seed = Seed;

export default {
  schema,
  api,
  seed,
};