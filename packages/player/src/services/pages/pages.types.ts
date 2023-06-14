
import type { Controller } from '@scrowl/template-core';
import type { BlockTextProps } from '@scrowl/template-block-text';
import type { LessonIntroProps } from '@scrowl/template-lesson-intro';
import type { QuizProps } from '@scrowl/template-quiz';
import type { SimpleTextProps } from '@scrowl/template-simple-text';
import type { SimpleVideoProps } from '@scrowl/template-simple-video';
import type { TwoColumnProps } from '@scrowl/template-two-column';
import type { InlineTextProps } from '@scrowl/template-inline-text';
import {
  PlayerTemplateList,
  ProjectModule,
  ProjectLesson,
  ProjectSlide
} from '../../root';

export interface PageCommons {
  slides: Array<ProjectSlide>;
  templates: PlayerTemplateList;
  slideId?: string;
  lesson: ProjectLesson;
  passingThreshold: number;
  controller: Controller;
};

export type PageProps = PageCommons & React.HTMLAttributes<HTMLDivElement>;

export interface PageDefinition {
  module: ProjectModule,
  lesson: ProjectLesson,
  url: string;
  Element: () => JSX.Element;
};

export interface SlideTypesMap {
  "blockText": BlockTextProps;
  "lessonIntro": LessonIntroProps;
  "simpleText": SimpleTextProps;
  "simpleVideo": SimpleVideoProps;
  "textColumns": TwoColumnProps;
  "quiz": QuizProps & {
    lesson: ProjectLesson;
    passingThreshold: number;
  };
  'inlineText': InlineTextProps;
}

export interface SlideCommons {
  idx: number;
  slide: ProjectSlide;
  templates: PlayerTemplateList;
};

export type SlideProps<K extends keyof SlideTypesMap> = SlideTypesMap[K] & SlideCommons;