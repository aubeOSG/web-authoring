import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface EditorApiPreviewLink extends RegisterEndpoint {
  name: '/editor/preview-link';
};

export interface EditorApiImageUpload extends RegisterEndpoint {
  name: '/editor/image-upload';
  method: 'POST';
};

export interface EditorApiImageFetch extends RegisterEndpoint {
  name: '/editor/image-fetch';
  method: 'POST';
};
