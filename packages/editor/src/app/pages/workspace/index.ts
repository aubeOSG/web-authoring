import Config from './page-workspace';
import States from './states';
import Hooks from './page-workspace-hooks';

export * from './page-workspace.types';

export const config = Config;
export const state = States;
export const hooks = Hooks;

export default {
  config,
  state,
  ...hooks,
};
