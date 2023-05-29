import path from 'path';
import express from 'express';
import { TemplatesApi } from './templates.types';
import { list as templateList } from '../../../main/models/templates/default-templates';
import * as templater from '../../../main/services/templater';
import { fs, rq } from '../../services';
import { port } from '../../config';

const assetsPath = path.join(fs.utils.rootPath, '../', 'main', 'assets');
const projectPath = path.join(assetsPath, 'project');
const templatesPath = path.join(assetsPath, 'templates');

export const get: express.Handler = (req, res) => {
  res.send({
    error: false,
    data: {
      templates: templateList,
    },
  });
};

export const load: express.Handler = (req, res) => {
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
};

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

export const viewer: express.Handler = (req, res) => {
  const filename = path.basename(req.path);
  const ext = path.extname(req.path).replace('.', '');
  const cacheBreaker = new Date().valueOf();
  let templateData;

  switch (ext) {
    case 'html':
      if (filename !== 'index.html') {
        res.sendFile(path.join(projectPath, filename));
        return;
      }
      
      const readHtml = fs.readSync(path.join(projectPath, 'canvas.html.hbs'));

      if (readHtml.error) {
        console.error(readHtml);
        res.sendStatus(rq.status.codes.internal);
        return;
      }

      templateData = getTemplateData(req.query);
      const compileResHtml = templater.compile(readHtml.data.contents, {
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
        res.sendFile(path.join(projectPath, filename));
        return;
      }

      if (isTemplateJs) {
        const templateFolder = filename.replace('scrowl.template-', '').replace('.component', '').replace('.js', '');;
        const templatePath = path.join(templatesPath, templateFolder, filename);
        res.sendFile(templatePath);
        return;
      }

      const readJs = fs.readSync(path.join(projectPath, 'canvas.js.hbs'));

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
      
      const compileResJs = templater.compile(readJs.data.contents, compileData);

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
        res.sendFile(path.join(projectPath, filename));
        return;
      }

      if (isTemplateCss) {
        const templateFolder = filename.replace('scrowl.template-', '').replace('.css', '');
        const templatePath = path.join(templatesPath, templateFolder, filename);

        res.sendFile(templatePath);
        return;
      }

      res.sendStatus(rq.status.codes.notFound);
      break;
    default:
      res.sendFile(path.join(projectPath, filename));
      break;
  }
};

export const API: TemplatesApi = {
  get: {
    name: '/templates/get',
    type: 'invoke',
    fn: get,
  },
  load: {
    name: '/templates/load',
    type: 'invoke',
    fn: load,
    method: 'POST',
  },
  viewer: {
    name: '/templates/viewer/*',
    type: 'invoke',
    fn: viewer,
  },
};

export default {
  API,
  get,
  load,
};
