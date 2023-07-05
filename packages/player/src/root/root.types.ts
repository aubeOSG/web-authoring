import React from 'react';
import type { TemplateSchema } from '@scrowl/template-core';
import type { BlockEditorOutputData } from '@scrowl/content-block-editor-react';

export type {
  TemplateSchema,
}

export type TemplateComponent = (TemplateElementProps) => JSX.Element;

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
  answers: Array<string>;
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
  content: BlockEditorOutputData;
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
  scorm: ScormData;
}

export type PlayerRootProps = PlayerRootCommons &
  React.AllHTMLAttributes<HTMLDivElement>;

export type PlayerRootConfig = {
  module: ProjectModule;
  lessons: Array<ProjectLesson>;
};

export type ProjectConfig = {
  name: string;
  subtitle: string;
  outlineConfig: Array<PlayerRootConfig>;
  resources?: Array<ProjectResource>;
  glossary?: Array<ProjectGlossaryItem>;
};