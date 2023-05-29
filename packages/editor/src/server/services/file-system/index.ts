import utils from './utils';
import readSync from './read-sync';
import writeSync from './write-sync';
import removeSync from './remove-sync';
import copySync from './copy-sync';

export * from './file-system.types';

export {
  utils,
  readSync,
  writeSync,
  removeSync,
  copySync,
};

export default {
  ...utils,
  readSync,
  writeSync,
  removeSync,
  copySync,
};