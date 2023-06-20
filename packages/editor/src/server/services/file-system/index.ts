import Utils from './utils';
import ReadSync from './read-sync';
import WriteSync from './write-sync';
import RemoveSync from './remove-sync';
import CopySync from './copy-sync';
import RenameSync from './rename-sync';

export * from './file-system.types';

export const utils = Utils;
export const readSync = ReadSync;
export const writeSync = WriteSync;
export const removeSync = RemoveSync;
export const copySync = CopySync;
export const renameSync = RenameSync;
export const assetsPath = utils.join(utils.rootPath, '../', 'main', 'assets');
export const projectPath = utils.join(assetsPath, 'project');

export default {
  utils,
  assetsPath,
  projectPath,
  readSync,
  writeSync,
  removeSync,
  copySync,
  renameSync,
};