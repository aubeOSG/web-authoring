import express from 'express';
import { rq } from '../services';
import endpoints from './endpoints';
import projects from './projects';
import users from './users';
import workspaces from './workspaces';

export const Route = '/api';

export const init = (app: express.Application) => {
  const router = express.Router();
  
  rq.register.addAll(router, endpoints.api);
  rq.register.addAll(router, projects.api);
  rq.register.addAll(router, users.api);
  rq.register.addAll(router, workspaces.api);
  app.use(Route, router);
};

export default {
  Route,
  init,
};