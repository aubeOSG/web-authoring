import type { ProjectsApiPublish } from '../projects.types';
import type { ProjectData } from '../../../../app/models/projects';

export const publish: ProjectsApiPublish = {
  name: '/projects/publish',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {
    const projectData = req.body as ProjectData;
  },
};

export default publish;