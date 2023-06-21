import RQ from './requester';
import FS from './file-system';
import TMPR from './templater';

export * from './file-system/file-system.types';
export * from './requester/requester.types';

export const rq = RQ;
export const fs = FS;
export const tmpr = TMPR;

export default {
  rq,
  fs,
  tmpr,
};