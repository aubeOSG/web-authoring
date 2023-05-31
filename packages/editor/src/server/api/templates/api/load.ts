import { TemplatesApiLoad } from '../templates.types';
import { port } from '../../../config';

export const load: TemplatesApiLoad = {
  name: '/templates/load',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {
    const payload = req.body;
    const cacheBreaker = new Date().valueOf();
    const templateName = payload.template.meta.filename;
    const templateComponent = payload.template.meta.component;
    const templateContent = Buffer.from(JSON.stringify(payload.template.content)).toString('base64');
    const templateControls = Buffer.from(JSON.stringify(payload.template.controlOptions)).toString('base64');
    const url = `http://localhost:${port}/api/templates/viewer/index.html?ver=${cacheBreaker}&template=${templateName}&component=${templateComponent}&content=${templateContent}&controls=${templateControls}`;

    res.send({
      error: false,
      data: {
        ...payload,
        url: url
      },
    });
  },
};

export default load;