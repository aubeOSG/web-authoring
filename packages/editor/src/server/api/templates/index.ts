import api from './api';
import {
  assetsPath as AssetsPath,
  projectPath as ProjectPath,
  templatesPath as TemplatesPath,
} from './pathing';

const assetsPath = AssetsPath;
const projectPath = ProjectPath;
const templatesPath = TemplatesPath;

export * from './templates.types';

export {
  api,
  assetsPath,
  projectPath,
  templatesPath,
};

export default {
  api,
  assetsPath,
  projectPath,
  templatesPath,
};