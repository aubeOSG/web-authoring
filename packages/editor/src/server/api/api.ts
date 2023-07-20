import express from 'express';
import type { Knex } from 'knex';
import { rq } from '../services';
import endpoints from './endpoints';
import auth from './auth';
import projects from './projects';
import users from './users';
import workspaces from './workspaces';
import editor from './editor';
import assets from './assets';

export const Route = '/api';

export const init = (app: express.Application, db: Knex) => {
  const router = express.Router();
  
  rq.register.addAll(router, endpoints.api);
  rq.register.addAll(router, auth.api);
  rq.register.addAll(router, projects.api);
  rq.register.addAll(router, users.api);
  rq.register.addAll(router, workspaces.api);
  rq.register.addAll(router, editor.api);
  rq.register.addAll(router, assets.api);

  app.use(Route, (req, res, next) => {
    req.db = db;
    next();
  });

  app.use(Route, router);
};

export default {
  Route,
  init,
};