import { TemplatesApiViewer } from '../templates.types';
import { fs, rq, tmpr } from '../../../services';
import { projectPath, templatesPath } from '../pathing';

const getTemplateData = (query) => {
  return {
    template: query.template,
    component: query.component,
    content: query.content,
    contentData: Buffer.from(query.content, 'base64').toString('utf-8'),
    controls: query.controls,
    controlsData: Buffer.from(query.controls, 'base64').toString('utf-8'),
  }
};

export const viewer: TemplatesApiViewer = {
  name: '/templates/viewer/*',
  type: 'invoke',
  fn: (req, res) => {
    const filename = fs.utils.getFilename(req.path);
    const ext = fs.utils.getExt(req.path).replace('.', '');
    const cacheBreaker = new Date().valueOf();
    let templateData;

    switch (ext) {
      case 'html':
        if (filename !== 'index.html') {
          res.sendFile(fs.utils.join(projectPath, filename));
          return;
        }
        
        const readHtml = fs.readSync(fs.utils.join(projectPath, 'canvas.html.hbs'));

        if (readHtml.error) {
          console.error(readHtml);
          res.sendStatus(rq.status.codes.internal);
          return;
        }

        templateData = getTemplateData(req.query);
        const compileResHtml = tmpr.compile(readHtml.data.contents, {
          templateJs: `./scrowl.template-${templateData.template}.js?ver=${cacheBreaker}`,
          templateCss: `./scrowl.template-${templateData.template}.css?ver=${cacheBreaker}`,
          canvasJs: `./index.js?ver=${cacheBreaker}&component=${templateData.component}&content=${templateData.content}&controls=${templateData.controls}`,
        });

        if (compileResHtml.error) {
          console.error(compileResHtml);
          res.sendStatus(rq.status.codes.internal);
          return;
        }

        res.send(compileResHtml.data.contents);
        break;
      case 'js':
        const isCanvasJs = filename === 'index.js';
        const isCoreJs = filename === 'scrowl.template-core.js';
        const isTemplateJs = filename.indexOf('scrowl.template-') !== -1;

        if (isCoreJs || (!isCanvasJs && !isTemplateJs)) {
          res.sendFile(fs.utils.join(projectPath, filename));
          return;
        }

        if (isTemplateJs) {
          const templateFolder = filename.replace('scrowl.template-', '').replace(/.(\d)+/g, '').replace('.component', '').replace('.js', '');
          const templatePath = fs.utils.join(templatesPath, templateFolder, filename);
          res.sendFile(templatePath);
          return;
        }

        const readJs = fs.readSync(fs.utils.join(projectPath, 'canvas.js.hbs'));

        if (readJs.error) {
          console.error(readJs);
          res.sendStatus(rq.status.codes.internal);
          return;
        }

        templateData = getTemplateData(req.query);

        const compileData = {
          templateComponent: templateData.component,
          templateContent: templateData.contentData,
          templateControls: templateData.controlsData,
        };
        
        const compileResJs = tmpr.compile(readJs.data.contents, compileData);

        if (compileResJs.error) {
          console.error(compileResJs);
          res.sendStatus(rq.status.codes.internal);
          return;
        }

        res.send(compileResJs.data.contents);
        break;
      case 'css':
        const isTemplateCss = filename.indexOf('scrowl.template-') !== -1;
        const isCoreCss = filename === 'scrowl.template-core.css';

        if (isCoreCss || !isTemplateCss) {
          res.sendFile(fs.utils.join(projectPath, filename));
          return;
        }

        if (isTemplateCss) {
          const templateFolder = filename.replace('scrowl.template-', '').replace('.css', '');
          const templatePath = fs.utils.join(templatesPath, templateFolder, filename);

          res.sendFile(templatePath);
          return;
        }

        res.sendStatus(rq.status.codes.notFound);
        break;
      default:
        res.sendFile(fs.utils.join(projectPath, filename));
        break;
    }
  },
};

export default viewer;