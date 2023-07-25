import {
  ProjectsReqPreviewAsset,
  ProjectMeta,
  ProjectsReqPreviewProject,
  UnsavedReq
} from './projects.types';
import { rq } from '../../services';

const ENDPOINTS = {
  create: '/projects/create',
  upload: '/projects/upload',
  uploadProgress: '/projects/upload/progress',
  save: '/projects/save',
  publish: '/projects/publish',
  list: '/projects/list',
  open: '/projects/open',
  previewAsset: '/projects/preview-asset',
  preview: '/projects/preview',
  get: '/projects',
};

const WINDOW_ENDPOINTS = {
  unsaved: '/window/unsaved/send', // sent from main
  onUnsaved: '/window/unsaved/on', // send to main
};

export const create = (data: {
  workspaceId: string,
  blueprint?: string
}): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.create, data, 'POST');
};

export const get = (data: {
  projectId?: string,
  workspaceId?: string,
}): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.get, data);
};

export const upload = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.upload, data);
};

export const onUploadProgress = (listener: rq.Listener) => {
  rq.on(ENDPOINTS.uploadProgress, listener);
};

export const offUploadProgress = () => {
  rq.offAll(ENDPOINTS.uploadProgress);
};

export const save = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.save, data, 'POST');
};

export const publish = (data?): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.publish, data, 'POST', { responseType: 'blob' });
};

export const list = (limit?: number): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.list, { limit });
};

export const open = (data: ProjectMeta): Promise<rq.ApiResult> => {
  return rq.invoke(ENDPOINTS.open, data);
};

export const previewAsset = (data: ProjectsReqPreviewAsset) => {
  return rq.invoke(ENDPOINTS.previewAsset, data as rq.JSON_DATA);
};

export const preview = (payload: ProjectsReqPreviewProject) => {
  return rq.invoke(ENDPOINTS.preview, payload as unknown as rq.JSON_DATA, 'POST');
};

export const onUnsavedCheck = (listener: rq.Listener) => {
  rq.on(WINDOW_ENDPOINTS.unsaved, listener);
};

export const offUnsavedCheck = () => {
  rq.offAll(WINDOW_ENDPOINTS.unsaved);
};

export const sendUnsavedStatus = (payload: UnsavedReq) => {
  rq.send(WINDOW_ENDPOINTS.onUnsaved, payload);
};

export default {
  get,
  create,
  upload,
  onUploadProgress,
  offUploadProgress,
  save,
  publish,
  list,
  open,
  previewAsset,
  preview,
  onUnsavedCheck,
  offUnsavedCheck,
  sendUnsavedStatus
};