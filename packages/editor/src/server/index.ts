import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import routes from './routes';
import { port } from './config';
import { connection } from './db';
import seed from './db/seed';
import { aws } from './services';

const app = express();
const db = connection.get();

app.set('json spaces', 2);
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

api.init(app);
routes.init(app);

const serveApp = () => {
  app.listen(port, () => {
    console.info(`Scrowl Web Server running at http://localhost:${port}/app`);
    const bucket = new aws.Bucket();

    bucket.list().then((data) => {
      if (!data.Contents) {
        return;
      }

      const Key = data.Contents[1].Key as string;

      bucket.get(Key).then((data) => {
        // body is a readable stream that will need to be piped through the response
        console.log({
          headers: {
            ContentType: data.ContentType,
            ContentEncoding: data.ContentEncoding,
            ContentDisposition: data.ContentDisposition,
            ContentLanguage: data.ContentLanguage,
            ContentLength: data.ContentLength,
            ContentRange: data.ContentRange,
          },
          body: data.Body,
        });
      });
    }, (e) => {
      console.error('unable to list bucket', e);
    });
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