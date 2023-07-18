import State from './workspaces-state';
import api from './workspaces-api';
import Hooks from './workspaces-hooks';

export const state = State;
export const API = api;
export const hooks = Hooks;

export default {
  state,
  API,
  ...hooks,
};
