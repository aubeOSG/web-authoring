import api from './templates-api';
import Hooks from './templates-hooks';

export * from './templates.types';

export const API = api;
export const hooks = Hooks;

export default {
  API,
  ...hooks,
};
