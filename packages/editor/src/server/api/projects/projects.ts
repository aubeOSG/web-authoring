import type { ProjectsApi } from './projects.types';
import endpoints from './endpoints';

export const API: ProjectsApi = {
  create: endpoints.create,
  upload: endpoints.upload,
  uploadProgress: endpoints.uploadProgress,
  save: endpoints.save,
  publish: endpoints.publish,
  list: endpoints.list,
  open: endpoints.open,
  previewAsset: endpoints.previewAsset,
  preview: endpoints.preview,
};

export default {
  API,
};