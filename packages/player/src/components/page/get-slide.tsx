import React from 'react';
import { PageSlideProps, TemplateTypesMap } from './page.types';
import type {
  TemplateComponent,
  PlayerTemplateList,
  ProjectLesson,
} from '../../root';
import type { QuizSchemaProps } from '@scrowl/template-quiz';
import type { BlockTextSchemaProps } from '@scrowl/template-block-text';
import type { LessonIntroSchemaProps } from '@scrowl/template-lesson-intro';
import type { SimpleTextSchemaProps } from '@scrowl/template-simple-text';
import type { SimpleVideoSchemaProps } from '@scrowl/template-simple-video';
import type { TwoColumnSchemaProps } from '@scrowl/template-two-column';
import type { InlineTextSchemaProps } from '@scrowl/template-inline-text';
import type { ProjectSlide, Controller } from '@scrowl/template-core';
import { Error, BoundaryError } from '..';

const TemplateError = ({ name, msg }: { name: string; msg?: string }) => {
  msg = !msg ? `Unable to find template: ${name}` : msg;

  return <Error msg={msg} />;
};

const TemplateWrapper = <K extends keyof TemplateTypesMap>({
  slide,
  templates,
  ...props
}: PageSlideProps<K>): (() => React.JSX.Element) => {
  const component = slide.template.meta.component;

  if (!templates.hasOwnProperty(component)) {
    return () => {
      return <TemplateError name={component} />;
    };
  }

  const Template = templates[component] as TemplateComponent;

  return () => {
    return (
      <BoundaryError>
        <Template {...props} />
      </BoundaryError>
    );
  };
};

export const getSlide = ({
  slide,
  parentId,
  idx,
  templates,
  controller,
  passingThreshold,
  lesson,
}: {
  slide: ProjectSlide;
  parentId: string;
  idx: number;
  templates: PlayerTemplateList;
  controller: Controller;
  passingThreshold?: number;
  lesson?: ProjectLesson;
}) => {
  let Wrapper, schema;
  const id = `${parentId}--slide-${slide.id}`;

  switch (slide.template.meta.component) {
    case 'BlockText':
      schema = slide.template as BlockTextSchemaProps;
      Wrapper = TemplateWrapper<'blockText'>({
        id,
        idx,
        slide,
        templates,
        schema: schema,
        controller,
      });
      break;
    case 'LessonIntro':
      schema = slide.template as LessonIntroSchemaProps;
      Wrapper = TemplateWrapper<'lessonIntro'>({
        id,
        idx,
        slide,
        templates,
        schema: schema,
        controller,
      });
      break;
    case 'Quiz':
      if (!lesson) {
        return () => {
          return (
            <TemplateError
              name="quiz"
              msg="unable to use quiz template: lesson missing"
            />
          );
        };
      }

      schema = slide.template as QuizSchemaProps;
      Wrapper = TemplateWrapper<'quiz'>({
        id,
        idx,
        slide,
        templates,
        schema: schema,
        controller,
        passingThreshold: passingThreshold || 1,
        lesson,
      });
      break;
    case 'SimpleText':
      schema = slide.template as SimpleTextSchemaProps;
      Wrapper = TemplateWrapper<'simpleText'>({
        id,
        idx,
        slide,
        templates,
        schema: schema,
        controller,
      });
      break;
    case 'SimpleVideo':
      schema = slide.template as SimpleVideoSchemaProps;
      Wrapper = TemplateWrapper<'simpleVideo'>({
        id,
        idx,
        slide,
        templates,
        schema: schema,
        controller,
      });
      break;
    case 'TwoColumn':
      schema = slide.template as TwoColumnSchemaProps;
      Wrapper = TemplateWrapper<'textColumns'>({
        id,
        idx,
        slide,
        templates,
        schema: schema,
        controller,
      });
      break;
    case 'InlineText':
      schema = slide.template as InlineTextSchemaProps;
      Wrapper = TemplateWrapper<'inlineText'>({
        id,
        idx,
        slide,
        templates,
        schema,
        controller,
      });
      break;
    default:
      console.error(
        `unable to get slide component: ${slide.template.meta.component} is not supported`
      );
      break;
  }

  return Wrapper;
};

export default getSlide;
