import axios from 'axios';
import { parse } from 'node-html-parser';
import type { EditorApiPreviewLink } from '../editor.types';

export const previewLink: EditorApiPreviewLink = {
  name: '/editor/preview-link',
  type: 'invoke',
  fn: async (req, res) => {
    console.log('editor preview link req', req.params, req.query, req.url);

    const fetchURL = req.query.url as string;

    axios.get(fetchURL).then((fetchRes) => {
      console.log('data', fetchRes.headers);
      console.log('status', fetchRes.status);
      console.log('statusText', fetchRes.statusText);

      if (fetchRes.status !== 200) {
        res.sendStatus(fetchRes.status);
        res.send(fetchRes.data);
        return;
      }

      const root = parse(fetchRes.data);
      const metaTags = root.querySelectorAll('meta[property*="og:"]');
      const meta = {};

      if (metaTags.length) {
        metaTags.forEach((elem) => {
          const property = elem.getAttribute('property');
  
          switch (property) {
            case 'og:title':
              meta['title'] = elem.getAttribute('content');
              break;
            case 'og:description':
              meta['description'] = elem.getAttribute('content');
              break;
            case 'og:image':
              meta['image'] = {
                url: elem.getAttribute('content'),
              };
              break;
          }
        });
      } else {
        meta['title'] = fetchURL;
      }

      res.json({
        success: 1,
        link: fetchURL,
        meta,
      });
    }).catch((e) => {
      res.sendStatus(500);
      res.send(e);
    });
  },
};

export default previewLink;