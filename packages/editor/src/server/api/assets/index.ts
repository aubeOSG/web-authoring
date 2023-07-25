import Schema from './schema';
import Seed from './seed';
import Api from './api';
import Extensions from './extensions';

export * from './assets.types';

export const schema = Schema;
export const seed = Seed;
export const api = Api;
export const extensions = Extensions;

export default {
  schema,
  seed,
  api,
  extensions,
};