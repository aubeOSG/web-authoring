import fs from 'fs-extra';
import { FileDataResult, FileExistsResult } from './file-system.types';
import { exists, normalize, isJSON } from './utils';

export const readSync = (
  pathname: string,
  media: BufferEncoding = 'utf8'
): FileDataResult | FileExistsResult => {
  const existsRes = exists(pathname);

  if (existsRes.error) {
    return {
      error: true,
      message: existsRes.message,
    };
  }

  if (media === undefined) {
    media = 'utf8';
  }

  const filename = normalize(pathname);

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

export default readSync;