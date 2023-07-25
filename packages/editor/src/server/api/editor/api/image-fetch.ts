/*
// https://github.com/editor-js/image#uploading-files-from-device-

RETURN OBJET

{
    "success" : 1, // 0 = failed
    "file": {
        "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        // ... and any additional fields you want to store, such as width, height, color, extension, etc
    }
}

*/
import { Buffer } from 'node:buffer';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { status } from '../../../services/requester';
import { EditorApiImageFetch } from '../editor.types';
import { extensions } from '../../assets';

export const imageFetch: EditorApiImageFetch = {
  name: '/editor/image-fetch',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {
    const fetchUrl = req.body.url;
    const workspaceId = JSON.parse(req.cookies.workspace);

    if (!workspaceId) {
      res.status(status.codes.bad).send({
        error: true,
        message: 'unable to fetch image: missing workspace id',
      });
      return;
    }

    if (!fetchUrl) {
      res.status(status.codes.bad).send({
        error: true,
        message: 'unable to fetch image: url missing',
      });
      return;
    }

    axios.get(fetchUrl, { responseType: 'arraybuffer' })
      .then(async (fetchRes) => {
        try {
          const buffer = Buffer.from(fetchRes.data, 'binary');
          const type = fetchRes.headers['content-type'] as string || '';
          const ext = extensions.fromMineType(type);
          const name = `${workspaceId}/${nanoid()}${ext ? ext : ''}`;
          const upload = await req.bucket.put({
            name,
            type,
            buffer,
          });

          if (upload.$metadata.httpStatusCode !== status.codes.ok) {
            res.status(upload.$metadata.httpStatusCode as number).send({
              error: true,
              message: `failed to upload image: ${upload['Code']}`,
              data: {
                trace: upload,
              }
            });
            return;
          }

          res.send({
            success: 1,
            file: {
              urlAPI: `/api/assets/${name}`,
              url: upload.Location,
            },
          });
        } catch (e) {
          res.status(status.codes.internal).send({
            error: true,
            message: 'unable to fetch image: unexpected error',
            data: {
              trace: e,
            },
          });  
        }
      })
      .catch((e) => {
        res.status(status.codes.internal).send({
          error: true,
          message: 'unable to fetch image: unexpected error',
          data: {
            trace: e,
          },
        });
      });
  },
};

export default imageFetch;