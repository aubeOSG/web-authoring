import { TemplatesApiGet } from '../templates.types';
import { list as templateList } from '../../../../main/models/templates/default-templates';

export const get: TemplatesApiGet = {
  name: '/templates/get',
  type: 'invoke',
  fn: (req, res) => {
    res.send({
      error: false,
      data: {
        templates: templateList,
      },
    });
  },
};

export default get;