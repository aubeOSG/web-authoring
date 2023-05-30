import fs from 'fs-extra';
import { FileResult, CopyOptions } from './file-system.types';
import { exists } from './utils';

export const copySync = (source: string, dest: string, opts?: CopyOptions): FileResult => {
  if (!source) {
    return {
      error: true,
      message: 'Unable to copy: source required',
    };
  }

  if (!dest) {
    return {
      error: true,
      message: 'Unable to copy: dest required',
    };
  }

  const sourceExists = exists(source);

  if (sourceExists.error) {
    return sourceExists;
  }

  if (!sourceExists.data.exists) {
    return {
      error: false,
      message: `Unable to copy: source ${source} does not exists`,
      data: {
        copied: false,
        source,
        dest,
      },
    };
  }

  try {
    fs.copySync(source, dest, opts);

    return {
      error: false,
      data: {
        source,
        dest,
      },
    };
  } catch (err) {
    return {
      error: true,
      message: 'Unable to copy: unexpected error',
      data: {
        trace: err,
      },
    };
  }
};

export default copySync;