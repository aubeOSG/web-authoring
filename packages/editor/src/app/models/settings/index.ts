import State from './settings-state';
import api from './settings-api';
import Hooks from './settings-hooks';

export const state = State;
export const API = api;
export const hooks = Hooks;

export default {
  state,
  API,
  ...hooks,
};
