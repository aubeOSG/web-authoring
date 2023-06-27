import RQ from './requester';
import FS from './file-system';
import TMPR from './templater';
import AWS from './aws';

export * from './file-system/file-system.types';
export * from './requester/requester.types';
export * from './aws/types';

export const rq = RQ;
export const fs = FS;
export const tmpr = TMPR;
export const aws = AWS;

export default {
  rq,
  fs,
  tmpr,
  aws,
};