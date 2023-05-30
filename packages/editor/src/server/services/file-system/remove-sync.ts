import fs from 'fs-extra';
import { FileResult } from './file-system.types';
import { exists } from './utils';

export const removeSync = (pathname: string): FileResult => {
  const existsRes = exists(pathname);

  if (existsRes.error) {
    return existsRes;
  }

  if (!existsRes.data.exists) {
    console.warn(`unable to remove ${pathname}: path does not exists`);
    return {
      error: false,
      data: {
        remove: false,
        pathname,
      }
    }
  }

  try {
    fs.removeSync(pathname);

    return {
      error: false,
      data: {
        remove: true,
        pathname,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to remove: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export default removeSync;