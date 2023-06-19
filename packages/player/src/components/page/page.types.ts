
import type { Controller } from '@scrowl/template-core';
import type { BlockTextProps } from '@scrowl/template-block-text';
import type { LessonIntroProps } from '@scrowl/template-lesson-intro';
import type { QuizProps } from '@scrowl/template-quiz';
import type { SimpleTextProps } from '@scrowl/template-simple-text';
import type { SimpleVideoProps } from '@scrowl/template-simple-video';
import type { TwoColumnProps } from '@scrowl/template-two-column';
import type { InlineTextProps } from '@scrowl/template-inline-text';
import {
  ProjectLesson,
} from '../../root';

export interface PageCommons {
  lesson: ProjectLesson;
  passingThreshold: number;
  controller: Controller;
};

export type PageProps = PageCommons & React.HTMLAttributes<HTMLDivElement>;

export interface TemplateTypesMap {
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
};

export type PageSlideProps<K extends keyof TemplateTypesMap> = TemplateTypesMap[K];