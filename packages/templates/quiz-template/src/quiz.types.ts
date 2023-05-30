import React from 'react';
import {
  TemplateSchemaMeta,
  TemplateCommons,
  InputTextboxProps,
  InputFieldsetProps,
  InputSelectProps,
  InputCheckboxProps,
  InputAssetProps,
  // InputRadioProps,
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

export interface QuizContentOptions extends InputFieldsetProps {
  content: {
    alignment: InputSelectProps;
    showProgress: InputCheckboxProps;
  };
}

export interface QuizQuestionProps extends InputFieldsetProps {
  content: {
    question: InputTextboxProps;
    // numberOfAnswers: InputSelectProps;
    // correctAnswer: InputRadioProps;
  };
}
//@ts-ignore
export interface QuizAnswersProps extends InputFieldsetProps {
  content: Array<InputTextboxProps>;
}
//@ts-ignore
export interface QuizSchemaProps extends TemplateSchema {
  meta: TemplateSchemaMeta;
  content: {
    question: QuizQuestionProps;
    answers: QuizAnswersProps;
    options: QuizContentOptions;
  };
}

export interface QuizCommons extends TemplateCommons {
  schema: QuizSchemaProps;
}

export type QuizProps = QuizCommons & React.AllHTMLAttributes<HTMLDivElement>;
