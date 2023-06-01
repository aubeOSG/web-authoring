import express from 'express';
import { rq } from '../services';
import * as endpoints from './endpoints';
import * as projects from './projects';
import * as templates from './templates';

export const Route = '/api';

export const init = (app: express.Application) => {
  const router = express.Router();
  
  rq.register.addAll(router, endpoints.api);
  rq.register.addAll(router, projects.api);
  rq.register.addAll(router, templates.api);
  app.use(Route, router);
};

export default {
  Route,
  init,
};