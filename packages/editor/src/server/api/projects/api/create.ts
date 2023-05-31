import type { ProjectsApiCreate } from '../projects.types';
import { blueprints } from '../../../../main/models/projects/blueprints'

export const create: ProjectsApiCreate = {
  name: '/projects/create',
  type: 'invoke',
  fn: (req, res) => {
    const project = blueprints.get('default');

    res.send({
      error: false,
      data: {
        project,
      },
    });
  },
};

export default create;