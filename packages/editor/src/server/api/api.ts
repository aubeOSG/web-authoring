import express from 'express';
import { rq } from '../services';
import * as endpoints from './endpoints';
import * as projects from './projects';
import * as users from './users';
import * as workspaces from './workspaces';

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