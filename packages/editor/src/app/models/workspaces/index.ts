import State from './workspaces-state';
import Middleware from './state-listeners';
import api from './workspaces-api';
import Hooks from './workspaces-hooks';

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
