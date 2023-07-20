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
import { EditorApiImageFetch } from '../editor.types';

export const imageFetch: EditorApiImageFetch = {
  name: '/editor/image-fetch',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {
    console.debug('editor-api::fetch', req.body, req.params, req.query);
  },
};

export default imageFetch;