import { ServerResponse } from 'http';
import fs from 'fs-extra';
import { utils } from '../file-system';

const CONTENT_TYPES = {
  css: 'text/css',
  json: 'application/json',
  js: 'text/javascript',
  html: 'text/html',
  text: 'text/plain',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
};

const getContentType = (filename: string) => {
  const ext = utils.getExt(filename);

  switch (ext) {
    case '.json':
      return CONTENT_TYPES.json;
    case '.js':
    case '.mjs':
      return CONTENT_TYPES.js;
    case '.html':
      return CONTENT_TYPES.html;
    case '.css':
      return CONTENT_TYPES.css;
    case '.webp':
      return CONTENT_TYPES.webp;
    case '.svg':
      return CONTENT_TYPES.svg;
    case '.mp4':
      return CONTENT_TYPES.mp4;
    case '.mp3':
      return CONTENT_TYPES.mp3;
    default:
      return CONTENT_TYPES.text;
  }
};

const responseOk = (
  src: string,
  contentType: string,
  res: ServerResponse
) => {
  try {
    const read = fs.createReadStream(src);

    res.setHeader('Content-Type', contentType);
    res.writeHead(200);
    read.pipe(res);
  } catch (e) {
    responseInternalError(e, res);
  }
};

const responseNotFound = (url: string, res: ServerResponse) => {
  res.setHeader('Content-Type', CONTENT_TYPES.text);
  res.writeHead(404);
  res.end(`Unable to find resource: ${url}`, 'utf-8');
};

const responseInternalError = (e: unknown, res: ServerResponse) => {
  res.setHeader('Content-Type', CONTENT_TYPES.text);
  res.writeHead(500);
  res.end(`${e}`, 'utf-8');
};

export const pipeContent = (res: ServerResponse, pathname: string) => {
  const existRes = utils.exists(pathname);
  
  if (existRes.error) {
    console.log('path error', pathname);
    responseInternalError(existRes, res);
    return;
  }

  if (!existRes.data.exists) {
    console.log('path not found', pathname);
    responseNotFound(pathname, res);
    return;
  }

  try {
    responseOk(pathname, getContentType(pathname), res);
  } catch (e) {
    responseInternalError(e, res);
  }
};

export default pipeContent;