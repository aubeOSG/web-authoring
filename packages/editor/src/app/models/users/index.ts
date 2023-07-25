import State from './users-state';
import Middleware from './state-listeners';
import api from './users-api';
import Hooks from './users-hooks';

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
