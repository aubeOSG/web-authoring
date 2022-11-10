
import path from 'path';
import { URL } from 'url';
import { app } from 'electron';
import fs from 'fs-extra';
import { rq, log } from '../';
import { FileDataResult, FileExistsResult } from './fs.types';

export const APP_PATHS = {
  root: path.join(__dirname, '../../../../'),
  save: path.join(app.getPath('documents'), 'scrowl'),
  downloads: app.getPath('downloads'),
  temp: path.join(app.getPath('temp'), 'scrowl'),
};

export const getAppPath = (filename: string) => {
  const isDevEnv = process.env.NODE_ENV === 'development';

  if (isDevEnv) {
    const port = process.env.PORT || 1234;
    const url = new URL(`http://localhost:${port}`);

    url.pathname = filename;
    return url.href;
  } else {
    return `file://${getSrcPath(filename)}`;
  }
};

export const getAssetPath = (...paths) => {
  return app.isPackaged
  ? joinPath(process.resourcesPath, 'assets', ...paths)
  : joinPath(APP_PATHS.root, 'assets', ...paths);
};

export const getSrcPath = (...paths) => {
  return app.isPackaged
  ? joinPath(process.resourcesPath, '../src', 'main', ...paths)
  : joinPath(APP_PATHS.root, 'src', 'main', ...paths);
}

export const getDistPath = (...paths) => {
  return joinPath(APP_PATHS.root, 'dist', ...paths);
};

const createResultError = (message: string, error?: unknown): rq.ApiResult => {
  if (error === undefined) {
    return {
      error: true,
      message,
    };
  } else {
    return {
      error: true,
      message,
      data: {
        trace: error,
      },
    };
  }
};

export const normalizePath = (pathname: string) => {
  return path.normalize(pathname);
};

export const isJSON = (name: string) => {
  return /.json$/.test(name) || /.project$/.test(name);
};

export const joinPath = (...paths: Array<string>) => {
  return path.join.apply(null, paths);
};

export const getExt = (pathname: string) => {
  return path.extname(pathname);
};

export const getDirname = (pathname: string) => {
  return path.dirname(pathname);
};

export const getBasename = (pathname: string, ext?: string) => {
  return path.basename(pathname, ext);
};

export const fileExistsSync = (pathname: string): rq.ApiResult => {
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

export const fileExists = (pathname: string) => {
  return new Promise<rq.ApiResult>(resolve => {
    try {
      fs.pathExists(pathname)
        .then(exists => {
          resolve({
            error: false,
            data: {
              exists,
              pathname,
            },
          });
        })
        .catch(e => {
          resolve(
            createResultError(`Unable to check existence: ${pathname}`, e)
          );
        });
    } catch (e) {
      resolve(createResultError(`Failed to check existence: ${pathname}`, e));
    }
  });
};

export const fileReadSync = (
  pathname: string,
  media: BufferEncoding = 'utf8'
): FileDataResult | FileExistsResult => {
  const exists = fileExistsSync(pathname);

  if (exists.error) {
    return {
      error: true,
      message: exists.message,
    };
  }

  if (media === undefined) {
    media = 'utf8';
  }

  const filename = normalizePath(pathname);

  try {
    let contents;
    const file = fs.readFileSync(filename, { encoding: media, flag: 'r' });

    if (isJSON(filename)) {
      contents = JSON.parse(file);
    } else {
      contents = file;
    }

    return {
      error: false,
      data: {
        filename,
        contents,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to read file: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileRead = (pathname: string) => {
  return new Promise<rq.ApiResult>(resolve => {
    if (!pathname) {
      resolve(createResultError('Unable to read file: path required'));
      return;
    }

    const existsRes = fileExistsSync(pathname);

    if (existsRes.error) {
      resolve(existsRes);
      return;
    }

    if (!existsRes.data.exists) {
      resolve(
        createResultError(
          `Unable to read file: file does not exist ${pathname}`
        )
      );
      return;
    }

    try {
      fs.readFile(pathname, { encoding: 'utf-8', flag: 'r' }).then(file => {
        resolve({
          error: false,
          data: {
            pathname,
            contents: isJSON(pathname) ? JSON.parse(file) : file,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
};

export const fileWriteSync = (
  pathname: string,
  contents: unknown
): FileDataResult => {
  const filename = normalizePath(pathname);

  if (!contents) {
    return {
      error: true,
      message: `Unable to write file: ${pathname} - contents required`,
    };
  }

  try {
    if (isJSON(pathname)) {
      if (typeof contents !== 'string') {
        contents = JSON.stringify(contents, null, 2);
      } else {
        contents = JSON.stringify(JSON.parse(contents), null, 2);
      }
    }

    fs.outputFileSync(filename, contents);
    return {
      error: false,
      data: {
        filename,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to write file: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileWrite = (pathname: string, contents: unknown) => {
  return new Promise<rq.ApiResult>((resolve, reject) => {
    if (!pathname) {
      resolve(createResultError('Unable to write file: path required'));
      return;
    }

    if (!contents) {
      resolve(createResultError('Unable to write file: contents required'));
      return;
    }

    try {
      let fileData = contents;

      if (isJSON(pathname)) {
        if (typeof contents !== 'string') {
          fileData = JSON.stringify(contents, null, 2);
        } else {
          fileData = JSON.stringify(JSON.parse(contents), null, 2);
        }
      }

      fs.outputFile(pathname, fileData).then(() => {
        resolve({
          error: false,
          data: {
            pathname,
            contents: fileData,
          },
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const copy = (source: string, dest: string, opts?: fs.CopyOptions) => {
  return new Promise<rq.ApiResult>(resolve => {
    if (!source) {
      log.error(`failed to copy: missing source`);
      resolve(
        createResultError('Unable to copy temp to source: source required')
      );
      return;
    }

    if (!dest) {
      log.error(`failed to copy: missing dest`);
      resolve(
        createResultError('Unable to copy temp to source: destination required')
      );
      return;
    }

    try {
      if (!fs.pathExistsSync(source)) {
        log.error(`failed to copy: source doesn't exist`);
        resolve({
          error: true,
          message: `Unable to copy ${source}: path does not exist`,
          data: {
            source,
            dest,
          },
        });
        return;
      }

      fs.copy(source, dest, opts)
        .then(() => {
          resolve({
            error: false,
            data: {
              source,
              dest,
            },
          });
        })
        .catch((e) => {
          log.error(`failed to copy: unexpected error`, e);
          resolve(createResultError(`Unable to copy ${source} to ${dest}`, e));
        });
    } catch (e) {
      log.error(`failed to copy: crash`, e);
      resolve(createResultError(`Unable to copy ${source} to ${dest}`, e));
    }
  });
};

export const fileRemove = (pathname) => {
  return new Promise<rq.ApiResult>((resolve) => {
    fs.remove(pathname)
      .then(() => {
        resolve({
          error: false,
          data: {
            pathname,
          },
        });
      })
      .catch((e) => {
        resolve({
          error: true,
          message: `Failed to remove contents: ${pathname}`,
          data: {
            trace: e,
            pathname,
          },
        });
      });
  });
}

export default {
  APP_PATHS,
  normalizePath,
  isJSON,
  joinPath,
  getExt,
  getDirname,
  getBasename,
  getAssetPath,
  fileExistsSync,
  fileExists,
  fileReadSync,
  fileRead,
  fileWriteSync,
  fileWrite,
  copy,
  fileRemove,
};
