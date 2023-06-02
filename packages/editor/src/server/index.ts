import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import routes from './routes';
import { port } from './config';
import { connection, seed } from './db';

const app = express();
const db = connection.get();

app.set('json spaces', 2);
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

api.init(app);
routes.init(app);

seed.generate(db)
  .then(() => {
    app.listen(port, () => {
      console.info(`Scrowl Web Server running at http://localhost:${port}/app`);
    });
  })
  .catch((e) => {
    console.error('Failed to seed database');
    console.error(e);
    process.exit(1);
  });