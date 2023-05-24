import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface ProjectsApiCreate extends RegisterEndpoint {
  name: '/projects/create';
};

export interface ProjectsApiUpload extends RegisterEndpoint {
  name: '/projects/upload';
};

export interface ProjectsApiUploadProgress extends RegisterEndpoint {
  name: '/projects/upload/progress';
};

export interface ProjectsApiSave extends RegisterEndpoint {
  name: '/projects/save';
};

export interface ProjectsApiPublish extends RegisterEndpoint {
  name: '/projects/publish';
};

export interface ProjectsApiList extends RegisterEndpoint {
  name: '/projects/list';
};

export interface ProjectsApiOpen extends RegisterEndpoint {
  name: '/projects/open';
};

export interface ProjectsApiPreviewAsset extends RegisterEndpoint {
  name: '/projects/preview-asset';
};

export interface ProjectsApiPreview extends RegisterEndpoint {
  name: '/projects/preview';
};

export type ProjectsApi = {
  create: ProjectsApiCreate;
  upload: ProjectsApiUpload;
  uploadProgress: ProjectsApiUploadProgress;
  save: ProjectsApiSave;
  publish: ProjectsApiPublish;
  list: ProjectsApiList;
  open: ProjectsApiOpen;
  previewAsset: ProjectsApiPreviewAsset;
  preview: ProjectsApiPreview;
};
