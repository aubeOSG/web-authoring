import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageProps } from './pages.types';
import { LessonAttempt, TemplateComponent } from '../../root/root.types';
import { Error } from '../../components';
import { stateHooks } from '../../state';

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

  const timeStamp = new Date();
  timeStamp.toLocaleString();
  timeStamp.toLocaleDateString();
  timeStamp.toLocaleTimeString();

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

  let currentSlide = `module-${slides[0].moduleId}--lesson-${slides[0].lessonId}--slide-${slides[0].id}-${slides[0].template.meta.filename}`;
  let currentIndex = 0;

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
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const slidesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === true) {
          currentSlide = entry.target.id;

          const currentSlideObj = {
            currentIndex: currentIndex,
            currentSlide: currentSlide,
          };

          const currentSlideEvent = new CustomEvent('CurrentSlidePageUpdate', {
            detail: currentSlideObj,
          });
          document.dispatchEvent(currentSlideEvent);
        }
      });
    });

    const finalSlideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === true) {
          currentSlide = 'owlui-last';
        }
      });
    }, options);

    let lastSlide = document.querySelector('.owlui-last');
    if (lastSlide) {
      finalSlideObserver.observe(lastSlide);
    }

    let targetElements;

    setTimeout(() => {
      targetElements = targets.current.map((target) => {
        return document.querySelector(`#${target}`);
      });

      targetElements.forEach((element) => {
        if (element) {
          slidesObserver.observe(element);
        }
      });
    }, 500);
  }, [slides]);

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

  if (!hasStarted) {
    const id = `${props.id}--slide-${slides[0].id}`;
    const component = slides[0].template.meta.component;
    const Template = templates[component] as TemplateComponent;

    return (
      <Template
        key={1}
        id={id}
        schema={slides[0].template}
        controller={controller}
        slides={slides[0]}
      />
    );
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
                //@ts-ignore
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
              //@ts-ignore
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
