import ADM from 'adm-zip';

import type { ProjectsApiPublish } from '../projects.types';
import type { ProjectData } from '../../../../app/models/projects';

export const publish: ProjectsApiPublish = {
  name: '/projects/publish',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {
    const projectData = req.body as ProjectData;
    const zip = new ADM();

    zip.addFile('project.json', Buffer.from(JSON.stringify(projectData), 'utf8'));

    const fileData = zip.toBuffer();
    const fileName = `${projectData.scorm.name}.zip`;
    const fileType = 'application/zip';

    res.set('Content-Type', fileType);
    res.set('Content-Disposition', `attachment; filename=${fileName}`);
    res.set('Content-Length', `${fileData.length}`);
    res.send(fileData);
  },
};

export default publish;