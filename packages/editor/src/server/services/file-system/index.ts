import utils from './utils';
import readSync from './read-sync';
import writeSync from './write-sync';
import removeSync from './remove-sync';
import copySync from './copy-sync';
import renameSync from './rename-sync';

export * from './file-system.types';

export const assetsPath = utils.join(utils.rootPath, '../', 'main', 'assets');
export const projectPath = utils.join(assetsPath, 'project');

export {
  utils,
  readSync,
  writeSync,
  removeSync,
  copySync,
  renameSync,
};

export default {
  ...utils,
  assetsPath,
  projectPath,
  readSync,
  writeSync,
  removeSync,
  copySync,
  renameSync,
};