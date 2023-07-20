import axios from 'axios';
import { parse } from 'node-html-parser';
import type { EditorApiPreviewLink } from '../editor.types';

export const previewLink: EditorApiPreviewLink = {
  name: '/editor/preview-link',
  type: 'invoke',
  fn: async (req, res) => {
    const fetchURL = req.query.url as string;

    axios.get(fetchURL).then((fetchRes) => {
      if (fetchRes.status !== 200) {
        res.status(fetchRes.status).send(fetchRes.data);
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
      if (e.response && e.response.status) {
        res.status(e.response.status).send(e);
      } else {
        res.status(500).send(e);
      }
    });
  },
};

export default previewLink;