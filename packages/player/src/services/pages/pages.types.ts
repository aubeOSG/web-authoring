
import type { TemplateProps } from '@scrowl/template-core';
import type { BlockTextProps, BlockTextSchemaProps } from '@scrowl/template-block-text';
import type { LessonIntroProps, LessonIntroSchemaProps } from '@scrowl/template-lesson-intro';
import type { QuizProps, QuizSchemaProps } from '@scrowl/template-quiz';
import type { SimpleTextProps, SimpleTextSchemaProps } from '@scrowl/template-simple-text';
import type { SimpleVideoProps, SimpleVideoSchemaProps } from '@scrowl/template-simple-video';
import type { TwoColumnProps, TwoColumnSchemaProps } from '@scrowl/template-two-column';
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
}

export interface SlideCommons {
  idx: number;
  slide: ProjectSlide;
  templates: PlayerTemplateList;
};

export type SlideProps<K extends keyof SlideTypesMap> = SlideTypesMap[K] & SlideCommons;