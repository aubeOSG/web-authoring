import Schema from './schema';
import Seed from './seed';
import Api from './api';

export * from './assets.types';

export const schema = Schema;
export const seed = Seed;
export const api = Api;

export default {
  schema,
  seed,
  api,
};