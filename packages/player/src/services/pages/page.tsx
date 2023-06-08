import React, { useState, useEffect, useRef } from 'react';
import { PageProps, SlideProps, SlideTypesMap } from './pages.types';
import { LessonAttempt, TemplateComponent } from '../../root/root.types';
import { Error } from '../../components';
import { stateHooks } from '../../state';
import { Datetime } from '@scrowl/utils';
import { QuizSchemaProps } from '@scrowl/template-quiz';
import { BlockTextSchemaProps } from '@scrowl/template-block-text';
import { LessonIntroSchemaProps } from '@scrowl/template-lesson-intro';
import { SimpleTextSchemaProps } from '@scrowl/template-simple-text';
import { SimpleVideoSchemaProps } from '@scrowl/template-simple-video';
import { TwoColumnSchemaProps } from '@scrowl/template-two-column';
import { ProjectSlide } from '@scrowl/template-core';

const getSlideComponent = <K extends keyof SlideTypesMap>({
  slide,
  templates,
  ...props
}: SlideProps<K>) => {
  const component = slide.template.meta.component;
  const Template = templates[component] as TemplateComponent;

  return () => {
    return <Template {...props} />;
  };
};

export const Page = ({
  slides,
  templates,
  slideId,
  lesson,
  passingThreshold,
  ...props
}: PageProps) => {
  const Scrowl = window['Scrowl'];
  const hasStarted = stateHooks.Course.useHasStarted();
  const toggleStarted = stateHooks.Course.useToggleStarted();
  const [randomSlides, setRandomSlides] = useState([]);
  const attempt = useRef(0);
  const targets = useRef(['']);

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

  const timeStamp = Datetime.localTime();
  const attempts: Array<LessonAttempt> = [
    {
      started_at: timeStamp,
      finished_at: '',
      questions: [],
    },
  ];

  const questions: Array<any> = [];

  slides.forEach((slide) => {
    if (slide.template.meta.component === 'Quiz') {
      const question: any = {};
      const answers: Array<string> = [];
      Object.keys(slide.template.content).forEach((key) => {
        if (key.includes('answer')) {
          //@ts-ignore
          answers.push(slide.template.content[key].content.answerText.value);
        }
      });

      question.id = `${props.id}--slide-${slide.id}-${slide.template.meta.filename}`;
      question.correct = false;
      question.question =
        // @ts-ignore
        slide.template.content.question.content.question.value;
      question.answers = answers;

      questions.push(question);
    }
  });

  if (lesson.attempts && lesson.attempts?.length > 0) {
    lesson.attempts[attempt.current].questions = questions;
  } else {
    attempts[attempt.current].questions = questions;
    lesson.attempts = attempts;
  }

  const controller = new Scrowl.core.scroll.Controller();

  if (randomSlides.length < 1) {
    targets.current = slides?.map((slide) => {
      return `module-${slide.moduleId}--lesson-${slide.lessonId}--slide-${slide.id}-${slide.template.meta.filename}`;
    });
  } else {
    targets.current = randomSlides?.map((slide) => {
      //@ts-ignore
      return `module-${slide.moduleId}--lesson-${slide.lessonId}--slide-${slide.id}-${slide.template.meta.filename}`;
    });
  }

  useEffect(() => {
    if (slideId && slideId?.length > 0) {
      document.querySelector(`#${slideId}`)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [slides]);

  useEffect(() => {
    return () => {
      controller.destroy(true);
    };
  }, []);

  const getSlide = (_slide: ProjectSlide, idx = 0) => {
    let Slide, schema;
    const id = `${props.id}--slide-${_slide.id}`;

    switch (_slide.template.meta.component) {
      case 'BlockText':
        schema = _slide.template as BlockTextSchemaProps;
        Slide = getSlideComponent<'blockText'>({
          id,
          idx,
          slide: _slide,
          templates: templates,
          schema: schema,
          controller,
        });
        break;
      case 'LessonIntro':
        schema = _slide.template as LessonIntroSchemaProps;
        Slide = getSlideComponent<'lessonIntro'>({
          id,
          idx,
          slide: _slide,
          templates: templates,
          schema: schema,
          controller,
        });
        break;
      case 'Quiz':
        schema = _slide.template as QuizSchemaProps;
        Slide = getSlideComponent<'quiz'>({
          id,
          idx,
          slide: _slide,
          templates: templates,
          schema: schema,
          controller,
          passingThreshold,
          lesson,
        });
        break;
      case 'SimpleText':
        schema = _slide.template as SimpleTextSchemaProps;
        Slide = getSlideComponent<'simpleText'>({
          id,
          idx,
          slide: _slide,
          templates: templates,
          schema: schema,
          controller,
        });
        break;
      case 'SimpleVideo':
        schema = _slide.template as SimpleVideoSchemaProps;
        Slide = getSlideComponent<'simpleVideo'>({
          id,
          idx,
          slide: _slide,
          templates: templates,
          schema: schema,
          controller,
        });
        break;
      case 'TwoColumn':
        schema = _slide.template as TwoColumnSchemaProps;
        Slide = getSlideComponent<'textColumns'>({
          id,
          idx,
          slide: _slide,
          templates: templates,
          schema: schema,
          controller,
        });
        break;
    }

    return Slide;
  };

  if (!hasStarted) {
    const SlideComp = getSlide(slides[0]);
    return <SlideComp />;
  } else if (randomSlides.length > 0) {
    return (
      <>
        {/* @ts-ignore */}
        {randomSlides.map((slide, idx) => {
          //@ts-ignore
          const id = `${props.id}--slide-${slide.id}`;
          //@ts-ignore
          const component = slide.template.meta.component;

          if (!templates.hasOwnProperty(component)) {
            return <Error msg={`Unabled to find template: ${component}`} />;
          }

          const Template = templates[component] as TemplateComponent;

          if (component === 'Quiz' || component === 'LessonOutro') {
            return (
              <Template
                key={idx}
                id={id}
                schema={slide.template}
                controller={controller}
                slides={randomSlides}
                lesson={lesson}
                attempt={attempt}
                passingThreshold={passingThreshold}
              />
            );
          }

          return (
            <Template
              key={idx}
              id={id}
              schema={slide.template}
              controller={controller}
              slides={slides}
            />
          );
        })}
      </>
    );
  } else {
    return (
      <>
        {slides.map((slide, idx) => {
          const id = `${props.id}--slide-${slide.id}`;
          const component = slide.template.meta.component;

          if (!templates.hasOwnProperty(component)) {
            return <Error msg={`Unabled to find template: ${component}`} />;
          }

          const Template = templates[component] as TemplateComponent;

          if (component === 'Quiz' || component === 'LessonOutro') {
            return (
              <Template
                key={idx}
                id={id}
                schema={slide.template}
                controller={controller}
                slides={slides}
                lesson={lesson}
                attempt={attempt}
                passingThreshold={passingThreshold}
              />
            );
          }

          return (
            <Template
              key={idx}
              id={id}
              schema={slide.template}
              controller={controller}
              slides={slides}
            />
          );
        })}
      </>
    );
  }
};

export default {
  Page,
};
