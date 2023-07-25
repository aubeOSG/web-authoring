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
import { EditorApiImageUpload } from '../editor.types';
import { status, form } from '../../../services/requester';
import { utils } from '../../../services/file-system';

export const imageUpload: EditorApiImageUpload = {
  name: '/editor/image-upload',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res) => {
    const workspaceId = JSON.parse(req.cookies.workspace);

    if (!workspaceId) {
      res.status(status.codes.bad).send({
        error: true,
        message: 'unable to upload image: missing workspace id',
      });
      return;
    }

    try {
      const payload = await form.get(req);
      
      if (!payload.files.image) {
        res.status(status.codes.bad).send({
          error: true,
          message: 'unable to upload image: no image',
        });
        return;
      }

      const data = payload.files.image[0];
      const ext = utils.getExt(data.originalFilename);
      const name = `${workspaceId}/${data.newFilename}${ext}`;
      const buffer = payload.buffers[data.newFilename];
      const type = data.mimetype;
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
      res.status(500).send({
        error: true,
        message: 'unable to upload image: unexpected error',
        data: {
          trace: e,
        },
      });
    }
  },
};

export default imageUpload;