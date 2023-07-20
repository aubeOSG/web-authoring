import State from './projects-state';
import Middleware from './state-listeners';
import api from './projects-api';
import Hooks from './projects-hooks';

export * from './projects.types';

export const state = State;
export const middleware = Middleware;
export const API = api;
export const hooks = Hooks;

export default {
  state,
  middleware,
  API,
  ...hooks,
};
