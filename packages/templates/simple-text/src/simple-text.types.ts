import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  TemplateControlOptions,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputAssetProps,
} from '@scrowl/template-core';
import { TemplateSchema } from '@scrowl/template-core';

export interface SimpleTextContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
  };
}

export interface SimpleTextContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
  };
}

export interface SimpleTextSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    text: InputTextboxProps;
    bgImage: SimpleTextContentBgImage;
    options: SimpleTextContentOptions;
    animateLists?: any;
  };
  controlOptions: TemplateControlOptions;
};

export interface SimpleTextCommons extends TemplateCommons {
  schema: SimpleTextSchemaProps;
}

export type SimpleTextProps = SimpleTextCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
