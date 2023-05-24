import { TemplateSchema as schema } from '@scrowl/template-core';

export type { TemplateSchema, TemplateSchemaContent, InputProps } from '@scrowl/template-core';

export type AspectRatios = {
  '4:3': {
    label: 'Standard 4:3';
    width: 1920;
    height: 1440;
  };
  '16:9': {
    label: 'Widescreen 16:9';
    width: 1920;
    height: 1080;
  };
  '16:10': {
    label: 'Widescreen 16:10';
    width: 1920;
    height: 1200;
  };
};

export type TemplateRecord = {
  name: string;
  source: string;
  manifest: schema;
};

export type TemplateRecords = Array<{TemplateRecord}>;

export type TemplateReqLoad = {
  template: schema;
};
