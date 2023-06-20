import Workspaces from './workspaces';
import Projects from './projects';
import Assets from './assets';
import Users from './users';

export * from './projects/projects.types';
export * from './users/users.types';

export const workspaces = Workspaces;
export const projects = Projects;
export const assets = Assets;
export const users = Users;

export default {
  workspaces,
  projects,
  assets,
  users,
};