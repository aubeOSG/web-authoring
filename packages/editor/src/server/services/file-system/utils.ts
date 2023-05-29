import path from 'path';
import os from 'node:os';
import fs from 'fs-extra';
import { rq } from '../';

export const basePath = process.env.PWD;
export const rootPath = path.join(basePath || '', 'src', 'server');
export const tempPath = os.tmpdir();

export const normalize = (pathname: string) => {
  return path.normalize(pathname);
};

export const join = (...paths: Array<string>) => {
  return path.normalize(path.join.apply(null, paths));
};

export const isJSON = (name: string) => {
  return /.json$/.test(name) || /.project$/.test(name);
};

export const exists = (pathname: string): rq.ApiResult => {
  try {
    return {
      error: false,
      data: {
        exists: fs.pathExistsSync(pathname),
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to check file existance: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export default {
  basePath,
  rootPath,
  tempPath,
  normalize,
  exists,
  isJSON,
  join,
};