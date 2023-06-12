import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
  TemplateControlOptions,
} from '@scrowl/template-core';
import { TemplateSchema } from '@scrowl/template-core';

export type {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
  TemplateControlOptions,
};

export interface InlineTextContentBgImage extends InputFieldsetProps {
  content: {
    alt: InputTextboxProps;
    url: InputAssetProps;
    bg: InputCheckboxProps;
  };
}

export interface InlineTextContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export interface InlineTextSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    text: InputTextboxProps;
    bgImage: InlineTextContentBgImage;
    options: InlineTextContentOptions;
  };
  controlOptions: TemplateControlOptions;
}

export interface InlineTextCommons extends TemplateCommons {
  schema: InlineTextSchemaProps;
  editMode?: boolean;
  focusElement?: string;
}

export type InlineTextProps = InlineTextCommons &
  React.AllHTMLAttributes<HTMLDivElement>;
