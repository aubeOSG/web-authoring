import React, { useEffect, useRef } from 'react';
import { PageProps, SlideProps, SlideTypesMap } from './pages.types';
import {
  TemplateComponent,
  PlayerTemplateList,
  ProjectLesson,
} from '../../root/root.types';
import { Error, BoundaryError } from '../../components';
import type { QuizSchemaProps } from '@scrowl/template-quiz';
import type { BlockTextSchemaProps } from '@scrowl/template-block-text';
import type { LessonIntroSchemaProps } from '@scrowl/template-lesson-intro';
import type { SimpleTextSchemaProps } from '@scrowl/template-simple-text';
import type { SimpleVideoSchemaProps } from '@scrowl/template-simple-video';
import type { TwoColumnSchemaProps } from '@scrowl/template-two-column';
import type { ProjectSlide, Controller } from '@scrowl/template-core';

const TemplateError = ({ name, msg }: { name: string; msg?: string }) => {
  msg = !msg ? `Unable to find template: ${name}` : msg;

  return <Error msg={msg} />;
};

const getSlideComponent = <K extends keyof SlideTypesMap>({
  slide,
  templates,
  ...props
}: SlideProps<K>) => {
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

const getSlide = ({
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
  let Slide, schema;
  const id = `${parentId}--slide-${slide.id}`;

  switch (slide.template.meta.component) {
    case 'BlockText':
      schema = slide.template as BlockTextSchemaProps;
      Slide = getSlideComponent<'blockText'>({
        id,
        idx,
        slide,
        templates: templates,
        schema: schema,
        controller,
      });
      break;
    case 'LessonIntro':
      schema = slide.template as LessonIntroSchemaProps;
      Slide = getSlideComponent<'lessonIntro'>({
        id,
        idx,
        slide: slide,
        templates: templates,
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
      Slide = getSlideComponent<'quiz'>({
        id,
        idx,
        slide: slide,
        templates: templates,
        schema: schema,
        controller,
        passingThreshold: passingThreshold || 1,
        lesson,
      });
      break;
    case 'SimpleText':
      schema = slide.template as SimpleTextSchemaProps;
      Slide = getSlideComponent<'simpleText'>({
        id,
        idx,
        slide: slide,
        templates: templates,
        schema: schema,
        controller,
      });
      break;
    case 'SimpleVideo':
      schema = slide.template as SimpleVideoSchemaProps;
      Slide = getSlideComponent<'simpleVideo'>({
        id,
        idx,
        slide: slide,
        templates: templates,
        schema: schema,
        controller,
      });
      break;
    case 'TwoColumn':
      schema = slide.template as TwoColumnSchemaProps;
      Slide = getSlideComponent<'textColumns'>({
        id,
        idx,
        slide: slide,
        templates: templates,
        schema: schema,
        controller,
      });
      break;
  }

  return Slide;
};

export const Page = ({
  slides,
  templates,
  slideId,
  lesson,
  passingThreshold,
  controller,
  ...props
}: PageProps) => {
  const lastSlideNodeRef = useRef<HTMLDivElement>(null);
  const lastSlideIdx = slides.length - 1;

  useEffect(() => {
    if (lastSlideNodeRef.current) {
      lastSlideNodeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastSlideNodeRef.current]);

  return (
    <BoundaryError>
      {slides.map((slide, idx) => {
        const SlideComp = getSlide({
          slide,
          parentId: props.id || '',
          idx,
          templates,
          controller,
          lesson,
          passingThreshold,
        });

        if (lastSlideIdx === idx) {
          return (
            <div key={idx} ref={lastSlideNodeRef}>
              <SlideComp />
            </div>
          );
        }

        return (
          <div key={idx}>
            <SlideComp />
          </div>
        );
      })}
    </BoundaryError>
  );
};

export default {
  Page,
};
