import React, { useEffect, useRef } from 'react';
import { PageProps, SlideProps, SlideTypesMap } from './pages.types';
import {
  LessonAttempt,
  TemplateComponent,
  PlayerTemplateList,
  ProjectLesson,
} from '../../root/root.types';
import { Error } from '../../components';
import { stateHooks } from '../../state';
import { Datetime } from '@scrowl/utils';
import { QuizSchemaProps } from '@scrowl/template-quiz';
import { BlockTextSchemaProps } from '@scrowl/template-block-text';
import { LessonIntroSchemaProps } from '@scrowl/template-lesson-intro';
import { SimpleTextSchemaProps } from '@scrowl/template-simple-text';
import { SimpleVideoSchemaProps } from '@scrowl/template-simple-video';
import { TwoColumnSchemaProps } from '@scrowl/template-two-column';
import { ProjectSlide, Controller } from '@scrowl/template-core';

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
    return <Template {...props} />;
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
  const Scrowl = window['Scrowl'];
  const hasStarted = stateHooks.Course.useHasStarted();
  const toggleStarted = stateHooks.Course.useToggleStarted();
  const lastSlideNodeRef = useRef<HTMLDivElement>(null);
  const lastSlideIdx = slides.length - 1;
  const attempt = useRef(0);

  if (
    Scrowl &&
    Scrowl.runtime &&
    Scrowl.runtime.API !== null &&
    hasStarted !== false
  ) {
    const [_courseStartError, suspendData] = Scrowl.runtime.getSuspendData();

    const parsedData = JSON.parse(suspendData);

    if (
      // @ts-ignore
      !Object.entries(parsedData).length > 0 ||
      (parsedData &&
        parsedData.courseStarted &&
        parsedData.courseStarted !== true)
    ) {
      toggleStarted();
    }
  }

  // TODO :: move to pages makePageDefinition fn
  // const timeStamp = Datetime.localTime();
  // const attempts: Array<LessonAttempt> = [
  //   {
  //     started_at: timeStamp,
  //     finished_at: '',
  //     questions: [],
  //   },
  // ];

  // const questions: Array<any> = [];

  // slides.forEach((slide) => {
  //   if (slide.template.meta.component === 'Quiz') {
  //     const question: any = {};
  //     const answers: Array<string> = [];
  //     Object.keys(slide.template.content).forEach((key) => {
  //       if (key.includes('answer')) {
  //         //@ts-ignore
  //         answers.push(slide.template.content[key].content.answerText.value);
  //       }
  //     });

  //     question.id = `${props.id}--slide-${slide.id}-${slide.template.meta.filename}`;
  //     question.correct = false;
  //     question.question =
  //       // @ts-ignore
  //       slide.template.content.question.content.question.value;
  //     question.answers = answers;

  //     questions.push(question);
  //   }
  // });

  // if (lesson.attempts && lesson.attempts?.length > 0) {
  //   lesson.attempts[attempt.current].questions = questions;
  // } else {
  //   attempts[attempt.current].questions = questions;
  //   lesson.attempts = attempts;
  // }

  useEffect(() => {
    if (lastSlideNodeRef.current) {
      lastSlideNodeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastSlideNodeRef.current]);

  useEffect(() => {
    return () => {
      controller.destroy(true);
    };
  }, []);

  if (!hasStarted) {
    const SlideComp = getSlide({
      slide: slides[0],
      parentId: props.id || '',
      idx: 0,
      templates,
      controller,
    });

    return <SlideComp />;
  }

  return (
    <>
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
          return <SlideComp ref={lastSlideNodeRef} />;
        }

        return <SlideComp />;
      })}
    </>
  );
};

export default {
  Page,
};
