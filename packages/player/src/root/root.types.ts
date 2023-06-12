import React from 'react';
import type { TemplateSchema } from '@scrowl/template-core';
import type { BlockTextProps, BlockTextSchemaProps } from '@scrowl/template-block-text';
import type { LessonIntroProps, LessonIntroSchemaProps } from '@scrowl/template-lesson-intro';
import type { SimpleTextProps, SimpleTextSchemaProps } from '@scrowl/template-simple-text';
import type { TwoColumnProps, TwoColumnSchemaProps } from '@scrowl/template-two-column';
import type { SimpleVideoProps, SimpleVideoSchemaProps } from '@scrowl/template-simple-video';
import type { QuizProps, QuizSchemaProps } from '@scrowl/template-quiz';

export type {
  TemplateSchema,
  BlockTextProps,
  LessonIntroProps,
  SimpleTextProps,
  TwoColumnProps,
  SimpleVideoProps,
  QuizProps
}

export type TemplateElementProps = BlockTextProps | LessonIntroProps | SimpleTextProps | TwoColumnProps;

export type TemplateComponent = (TemplateElementProps) => JSX.Element;

export type PlayerTemplateList = {
  [key: string]: TemplateComponent;
};

export type ProjectAsset = {
  filname: string;
  isDeleted?: boolean;
};

export type ProjectModule = {
  id: number;
  name: string;
  passingThreshold?: number;
};

export type LessonQuestion = {
  id: string;
  correct: boolean;
  question: string;
  answer: string;
  started_at?: string;
  submitted_at?: string;
};

export type LessonAttempt = {
  started_at?: string | Date;
  finished_at?: string | Date;
  questions: Array<LessonQuestion>;
};

export type ProjectLesson = {
  name: string;
  moduleId: number;
  id: number;
  attempts?: Array<LessonAttempt>;
};

export type ProjectSlide = {
  name: string;
  moduleId: number;
  lessonId: number;
  id: number;
  template: |
    BlockTextSchemaProps |
    LessonIntroSchemaProps |
    SimpleTextSchemaProps |
    TwoColumnSchemaProps |
    SimpleVideoSchemaProps |
    QuizSchemaProps;
};

export type ProjectGlossaryItem = {
  id: number;
  word: string;
  definition: string;
};

export type ProjectResource = {
  id: number;
  filename: string;
  title: string;
  description?: string;
};

export type ProjectData = {
  name?: string;
  subtitle?: string;
  modules?: Array<ProjectModule>;
  lessons?: Array<ProjectLesson>;
  slides?: Array<ProjectSlide>;
  glossary?: Array<ProjectGlossaryItem>;
  resources?: Array<ProjectResource>;
};

export type ScormData = {
  authors?: string;
  description?: string;
  identifier?: string;
  name?: string;
  optimizeMedia?: string;
  organization?: string;
  outputFormat?: string;
  reportStatus?: string;
};

export interface PlayerRootCommons {
  project: ProjectData;
  templateList: PlayerTemplateList;
  scorm: ScormData;
}

export type PlayerRootProps = PlayerRootCommons &
  React.AllHTMLAttributes<HTMLDivElement>;

export type PlayerRootLesson = {
  lesson: ProjectLesson;
  slides: Array<ProjectSlide>;
};

export type PlayerRootConfig = {
  module: ProjectModule;
  lessons: Array<PlayerRootLesson>;
};

export type ProjectConfig = {
  name: string;
  subtitle: string;
  outlineConfig: Array<PlayerRootConfig>;
  resources?: Array<ProjectResource>;
  glossary?: Array<ProjectGlossaryItem>;
};