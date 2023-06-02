import { fs } from '../../services';

export const assetsPath = fs.utils.join(fs.utils.rootPath, '../', 'main', 'assets');
export const projectPath = fs.utils.join(assetsPath, 'project');
export const templatesPath = fs.utils.join(assetsPath, 'templates');

export default {
  assetsPath,
  projectPath,
  templatesPath,
};