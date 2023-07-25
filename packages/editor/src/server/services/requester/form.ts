import { Request } from 'express';
import formidable from 'formidable';
import type { Fields, Files } from 'formidable';
import { Buffer } from 'node:buffer';
import { Writable } from 'node:stream';

export const get = (req: Request) => {
  return new Promise<{ fields: Fields, files: Files, buffers: { [key: string]: Buffer } }>((resolve, reject) => {
    let buffers = {};

    const form = formidable({
      fileWriteStreamHandler: (file) => {
        const chunks: Array<any> = [];
        const filename = file ? file['newFilename'] : '';
        const writable = new Writable({
          write (chunk, enc, next) {
            chunks.push(chunk);
            next();
          },
          destroy () {
            buffers = {};
          },
          final (cb) {
            const buffer = Buffer.concat(chunks);

            buffers[filename] = buffer;
            cb();
          },
        });

        return writable;
      },
    });

    try {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        
        resolve({
          fields,
          files,
          buffers,
        });
      });

    } catch (e) {
      reject(e);
    }
  });
};

export default {
  get,
};