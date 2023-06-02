import { ProjectsApiPreviewViewer } from '../projects.types';
import { fs, rq } from '../../../services';
import { projectPath, templatesPath } from '../../templates';

const getPathRootOS = (): string => {
  const osRootSteps = process.cwd().split('/').length;
  let pathname = '';

  for (let i = 0; i < osRootSteps; i++) {
    pathname += '../';
  }

  return pathname;
};

const getPreviewParams = (query) => {
  return {
    tmpDirId: query.source,
  };
};

export const previewViewer: ProjectsApiPreviewViewer = {
  name: '/projects/preview/viewer/*',
  type: 'invoke',
  fn: (req, res) => {
    const osRootPath = getPathRootOS();
    const previewParams = getPreviewParams(req.query);
    const tempSource =
      previewParams.tmpDirId ?
        fs.utils.join(osRootPath, fs.utils.tempPath, previewParams.tmpDirId)
        : fs.utils.join(projectPath);
    const previewSource = fs.utils.join(tempSource, 'package');
    const previewContent = fs.utils.join(previewSource, 'content');
    let filename = fs.utils.getFilename(req.path);
    let isTemplateResource = false;
    let pathname = '';

    if (!req.path) {
      res.sendStatus(404);
      return;
    }

    if (!previewParams.tmpDirId) {
      isTemplateResource = filename.indexOf('scrowl.template-') !== -1;

      if (isTemplateResource) {
        const templateFolder = filename.replace('scrowl.template-', '').replace(/.(\d)+/g, '').replace('.component', '').replace('.js', '').replace('.css',  '');

        pathname = fs.utils.join(templatesPath, templateFolder, filename);
      }
    }

    if (!pathname) {
      pathname =
        previewParams.tmpDirId ?
          fs.utils.join(previewContent, filename)
          : fs.utils.join(tempSource, fs.utils.getFilename(req.path));
    }
    
    rq.pipeContent(res, pathname);
  },
};

export default previewViewer;