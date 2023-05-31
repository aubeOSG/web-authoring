import * as Workspaces from './workspaces';
import * as Projects from './projects';
import * as Assets from './assets';
import * as Users from './users';

export * from './projects/projects.types';
export * from './users/users.types';

export const workspaces = {
  schema: Workspaces.schema,
  seed: Workspaces.seed,
};

export const projects = {
  schema: Projects.schema,
  seed: Projects.seed,
};

export const assets = {
  schema: Assets.schema,
  seed: Assets.seed,
};

export const users = {
  schema: Users.schema,
  seed: Users.seed,
};

export default {
  workspaces,
  projects,
  assets,
  users,
};