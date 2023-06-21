import type { CopyOptionsSync } from 'fs-extra';
import type { RegisterEndpoint } from '..';
import {
  ApiResult,
  ApiResultSuccess,
  ApiResultError,
  JsonResult,
} from '../requester';

export { Dirent } from 'fs-extra';

export interface AssetTypeImage {
  name: 'image';
  extensions: ['jpg', 'jpeg', 'png', 'gif'];
}

export interface AssetTypeDocument {
  name: 'document';
  extensions: ['txt', 'doc', 'docx', 'pdf', 'zip'];
}

export interface AssetTypeVideo {
  name: 'video';
  extensions: ['mp4', 'mkv', 'avi'];
}

export interface AssetTypeAudio {
  name: 'audio';
  extensions: ['mp3', 'mp4'];
}

export interface AssetTypeJson {
  name: 'json';
  extensions: ['json'];
}

export type AssetFilter = AssetTypeImage | AssetTypeDocument | AssetTypeVideo | AssetTypeAudio | AssetTypeJson;

export type AssetFilters = {
  image: AssetTypeImage;
  document: AssetTypeDocument;
  video: AssetTypeVideo;
  audio: AssetTypeAudio;
  json: AssetTypeJson;
}

export type AssetType = 'image' | 'document' | 'video' | 'audio' | 'json';

export interface DirectoryTempResultSuccess
  extends Omit<ApiResultSuccess, 'data'> {
  data: {
    pathname: string;
  };
}

export type FileResult = ApiResult;

export type CopyOptions = CopyOptionsSync;

export type DirectoryTempResult = DirectoryTempResultSuccess | ApiResultError;

export interface FileExistsResultSuccess
  extends Omit<ApiResultSuccess, 'data'> {
  data: {
    exists: boolean;
  };
}

export type FileExistsResult = FileExistsResultSuccess | ApiResultError;

export interface FileDataResultSuccess extends Omit<ApiResultSuccess, 'data'> {
  data: {
    filename: string;
    contents?: string | JsonResult;
  };
}

export type FileDataResult = FileDataResultSuccess | ApiResultError;

export interface FSApiMessage extends Omit<RegisterEndpoint, 'name'> {
  name: '/system/message';
}

export interface FSApiSave extends Omit<RegisterEndpoint, 'name'> {
  name: '/system/save';
}

export interface FSApiOpen extends Omit<RegisterEndpoint, 'name'> {
  name: '/system/open';
}

export type FSApi = Partial<{
  message: FSApiMessage;
  save: FSApiSave;
  open: FSApiOpen;
}>;

export type FSEndpoints = {
  message: FSApiMessage['name'];
  save: FSApiSave['name'];
  open: FSApiOpen['name'];
};
