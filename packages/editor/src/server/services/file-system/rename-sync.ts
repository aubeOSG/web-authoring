import fs from 'fs-extra';
import { FileResult } from './file-system.types';
import { exists } from './utils';

export const renameSync = (src: string, filename: string): FileResult => {
  const existRes = exists(src);

  if (existRes.error) {
    return existRes;
  }

  try {
    fs.renameSync(src, filename);
    return {
      error: false,
      data: {
        src,
        filename,
      },
    };
  } catch (err) {
    return {
      error: true,
      message: 'unable to rename: unexpected error',
      data: {
        trace: err,
      },
    };
  }
};

export default renameSync;