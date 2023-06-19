import type { JSON_DATA } from '@scrowl/utils';
import { List } from '@scrowl/utils';
import { ProjectData } from '../../../../app/models/projects';
import { PreviewTypes } from '../../../../app/services/menu';
import type { ProjectsApiPreview } from '../projects.types';
import { fs } from '../../../services';
import { generateProjectFiles } from './publish';
import previewViewer from './preview-viewer';
import { port } from '../../../config';

const getPathRootOS = (): string => {
  const osRootSteps = process.cwd().split('/').length;
  let pathname = '';

  for (let i = 0; i < osRootSteps; i++) {
    pathname += '../';
  }

  return pathname;
};

export const cleanupTempDir = (tmpDirId: string) => {
  const osRootPath = getPathRootOS();
  const tempSource = fs.utils.join(osRootPath, fs.utils.tempPath, tmpDirId);

  return fs.removeSync(tempSource);
};

export const createPreviewSource = (previewData: ProjectData) => {
  const generationRes = generateProjectFiles(previewData, { entrySrcHTML: 'preview.html.hbs' });
  console.log('creating preview source', generationRes);
  if (generationRes.error) {
    cleanupTempDir(generationRes.data.tmpDirId);
    return generationRes;
  }

  const cacheBreaker = new Date().valueOf();
  return {
    error: false,
    data: {
      url: `http://localhost:${port}/api${previewViewer.name.replace('*', '')}index.html?ver=${cacheBreaker}&source=${generationRes.data.tmpDirId}`,
    }
  }
};

export const preview: ProjectsApiPreview = {
  name: '/projects/preview',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {
    const payload = req.body;
    let previewData: ProjectData | undefined = undefined;
    const project = payload.project as ProjectData;
    const type = payload.type as PreviewTypes;
    const entityId = Number.isInteger(payload.entityId) ? payload.entityId : -1;
    const previewError = {
      error: true,
      message: '',
      data: payload,
    };

    switch (type) {
      case 'lesson':
        if (!project.lessons) {
          previewError.message = 'unable to preview: project has no lessons';
          res.send(previewError);
          return;
        }

        if (entityId === -1) {
          previewError.message = 'unable to preview: lesson id required';
          res.send(previewError);
          return;
        }

        const lesosns = project.lessons as unknown as Array<JSON_DATA>;
        const lessonIdx = List.indexBy(lesosns, 'id', entityId);

        if (lessonIdx === -1) {
          previewError.message = 'unable to preview: lesson not found';
          res.send(previewError);
          return;
        }

        const lesson = project.lessons[lessonIdx];

        previewData = {
          ...project,
          modules: project.modules?.filter((m) => {
            return m.id === lesson.moduleId;
          }),
          lessons: [lesson],
        };
        break;
      case 'module':
        if (!project.modules) {
          previewError.message = 'unable to preview: project has no modules';
          res.send(previewError);
          return;
        }

        if (entityId === -1) {
          previewError.message = 'unable to preview: module id required';
          res.send(previewError);
          return;
        }

        const modules = project.modules as unknown as Array<JSON_DATA>;
        const moduleIdx = List.indexBy(modules, 'id', entityId);

        if (moduleIdx === -1) {
          previewError.message = 'unable to preview: module not found';
          res.send(previewError);
          return;
        }

        const module = project.modules[moduleIdx];

        previewData = {
          ...project,
          modules: [module],
          lessons: project.lessons?.filter((l) => {
            return l.moduleId === module.id;
          }),
        };
        break;
      case 'project':
      default:
        previewData = project;
        break;
    }
    
    res.send(createPreviewSource(previewData));
  },
};

export default preview;