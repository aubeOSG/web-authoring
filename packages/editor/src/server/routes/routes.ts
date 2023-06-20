import path from 'path';
import express from 'express';
import type { Application } from 'express';

const StaticPath = path.join(process.cwd(), 'dist');
const AppPathPageHome = path.join(StaticPath, 'app.html');

export const init = (app: Application) => {
  app.use('/public', express.static(StaticPath));

  app.get('/app', (req, res) => {
    res.sendFile(AppPathPageHome);
  });

  app.get('/app/*', (req, res) => {
    res.sendFile(AppPathPageHome);
  });
};

export default {
  init,
};