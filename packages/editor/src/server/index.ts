import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { nanoid } from 'nanoid';
import api from './api';
import routes from './routes';
import { port } from './config';
import { connection } from './db';
import seed from './db/seed';

const app = express();
const db = connection.get();

app.set('json spaces', 2);
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  name: 'session',
  secret: nanoid(),
  resave: false,
  saveUninitialized: true,
}));

api.init(app);
routes.init(app);

const serveApp = () => {
  app.listen(port, () => {
    console.info(`Scrowl Web Server running at http://localhost:${port}/app`);
  });
};

const catchSeedError = (e) => {
  console.error('Failed to seed database');
  console.error(e);
  process.exit(1);
};

if (!db) {
  console.warn('Unable to connect to DB');
  serveApp();
} else {
  seed(db)
  .then(serveApp)
  .catch(catchSeedError);
}