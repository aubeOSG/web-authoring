import State from './users-state';
import api from './users-api';
import Hooks from './users-hooks';

export const state = State;
export const API = api;
export const hooks = Hooks;

export default {
  state,
  API,
  ...hooks,
};
