import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface EditorApiPreviewLink extends RegisterEndpoint {
  name: '/editor/preview-link';
};

export type EditorApi = {
  previewLink: EditorApiPreviewLink;
};
