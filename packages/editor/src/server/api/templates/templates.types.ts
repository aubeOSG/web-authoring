
import type { RegisterEndpoint } from '../../services/requester/requester.types';

export interface TemplatesApiGet extends RegisterEndpoint {
  name: '/templates/get';
};

export interface TemplatesApiLoad extends RegisterEndpoint {
  name: '/templates/load';
  method: 'POST';
};

export interface TemplatesApiViewer extends RegisterEndpoint {
  name: '/templates/viewer/*'
}

export type TemplatesApi = {
  get: TemplatesApiGet;
  load: TemplatesApiLoad;
  viewer: TemplatesApiViewer;
};

export type TemplateInfo = {
  component: string;
  js: string;
  css: string;
}

export type TemplateList = Array<TemplateInfo>;

export type TemplateMap = {
  [key: string]: TemplateInfo;
};