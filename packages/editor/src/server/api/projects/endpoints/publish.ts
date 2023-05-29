import ADM from 'adm-zip';
import { v4 as uuid } from 'uuid';
import type { ProjectData } from '../../../../app/models/projects';
import type { ProjectsApiPublish } from '../projects.types';
import type { TemplateList, TemplateMap } from '../../templates';
import { fs } from '../../../services';
import { templatesPath, projectPath } from '../../templates';

export const getProjectTemplates = (project: ProjectData): [false | Set<string>, TemplateList] => {
  let templatePath;
  const templates = new Set<string>();
  const templateList: TemplateList = [];
  const templateMap: TemplateMap = {};

  if (!project.slides) {
    return [false, templateList];
  }

  project.slides.forEach((slide) => {
    templatePath = fs.utils.join(templatesPath, slide.template.meta.filename);
    const templateExists = fs.utils.exists(templatePath);

    if (!templateExists.error && templateExists.data.exists) {
      templates.add(templatePath);

      if (!templateMap[slide.template.meta.component]) {
        templateMap[slide.template.meta.component] = {
          component: slide.template.meta.component,
          js: `./scrowl.template-${slide.template.meta.filename}.js`,
          css: `./scrowl.template-${slide.template.meta.filename}.css`,
        };
      }
    }
  });

  for (const [key, template] of Object.entries(templateMap)) {
    templateList.push(template);
  }

  return [templates, templateList];
};

export const createScormPackage = (projectData: ProjectData) => {
  const id = uuid();
  const osRootSteps = process.cwd().split('/').length;
  let osRootPath = '';

  for (let i = 0; i < osRootSteps; i++) {
    osRootPath += '../';
  }

  const tempSource = fs.utils.join(osRootPath, fs.utils.tempPath, id);
  const tempContent = fs.utils.join(tempSource, 'content');
  const tempAsset = fs.utils.join(tempContent, 'assets');

  const addContent = (filename, contents) => {
    const filePath = fs.utils.join(tempContent, filename);

    fs.writeSync(tempSource, contents);
  };

  const copyAsset = (pathname) => {
    fs.copySync(pathname, tempAsset);
  };

  const cleanup = () => {
    fs.removeSync(tempSource);
  };

  fs.copySync(projectPath, tempAsset, {
    overwrite: false,
    filter: (src: string) => {
      return src.indexOf('.hbs') === -1;
    },
  });

  const [projectTemplatePaths, projectTemplatesList] = getProjectTemplates(projectData);

  if (projectTemplatePaths) {
    projectTemplatePaths.forEach(copyAsset);
  }

  // compile & add scorm.html.hbs
  // compile & add scorm.js.hbs
};

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
    createScormPackage(projectData);
    res.set('Content-Type', fileType);
    res.set('Content-Disposition', `attachment; filename=${fileName}`);
    res.set('Content-Length', `${fileData.length}`);
    res.send(fileData);
  },
};

export default publish;