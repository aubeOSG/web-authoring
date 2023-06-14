import React, { Suspense, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Datetime, hasProp } from '@scrowl/utils';
import { PageDefinition } from './pages.types';
import {
  LessonAttempt,
  LessonQuestion,
  PlayerRootConfig,
  PlayerRootLesson,
  PlayerTemplateList,
  ProjectConfig,
} from '../../root/root.types';
import { stateHooks } from '../../hooks';
import utils from '../../utils';
// @ts-ignore
import * as _css from '../../root/_root.scss';
import { NavBar } from '../../components/navbar';
import { BoundaryError } from '../../components';
import { Page } from './page';
import { QuizSchemaProps } from '@scrowl/template-quiz';
import { ProjectSlide } from '@scrowl/template-core';

const css = utils.css.removeMapPrefix(_css);

const getNextPageLink = (
  module: PlayerRootConfig,
  page: PlayerRootLesson,
  project: ProjectConfig,
  mIdx: number,
  lIdx: number
) => {
  let nextLessonUrl;
  let nextLessonId;
  let nextLessonText;

  if (
    lIdx < module.lessons.length - 1 ||
    mIdx < project.outlineConfig.length - 1
  ) {
    nextLessonId = `module-${mIdx}--lesson-${page.lesson.id + 1}`;
    nextLessonUrl = `/${nextLessonId}`;
    nextLessonText = `Continue to the next lesson`;
  }

  if (
    lIdx === module.lessons.length - 1 &&
    mIdx <= project.outlineConfig.length - 1
  ) {
    nextLessonId = `module-${mIdx + 1}--lesson-${page.lesson.id + 1}`;
    nextLessonUrl = `/${nextLessonId}`;
    nextLessonText = `Continue to the first Lesson of Module ${mIdx + 1}`;
  }

  return {
    nextLessonId,
    nextLessonUrl,
    nextLessonText,
  };
};

const createQuizAttempts = (id: string, page: PlayerRootLesson) => {
  const attempt: LessonAttempt = {
    started_at: Datetime.localTime(),
    finished_at: '',
    questions: [],
  };
  let schema: QuizSchemaProps;
  let question: LessonQuestion = {
    id: '',
    correct: false,
    question: '',
    answers: [],
  };
  let contentKeys: Array<string> = [];

  page.slides.forEach((slide) => {
    if (slide.template.meta.component !== 'Quiz') {
      return;
    }

    schema = slide.template as QuizSchemaProps;
    question.id = `${id}--slide-${slide.id}-${schema.meta.filename}`;
    question.question = schema.content.question.content.question.value || '';
    contentKeys = Object.keys(schema.content);
    question.answers = [];

    contentKeys.forEach((key) => {
      if (key.indexOf('answer') === -1) {
        return;
      }

      question.answers?.push(schema.content[key].content.answerText.value);
    });

    attempt.questions.push(question);
  });

  return attempt;
};

const PageContainer = ({
  id,
  url,
  module,
  mIdx,
  page,
  lIdx,
  slideId,
  templateList,
  project,
  children,
}: {
  id: string;
  url: string;
  module: PlayerRootConfig;
  mIdx: number;
  page: PlayerRootLesson;
  lIdx: number;
  slideId: string;
  templateList: PlayerTemplateList;
  project: ProjectConfig;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const Scrowl = window['Scrowl'];
  const runtime = hasProp(Scrowl, 'runtime') ? Scrowl.runtime : undefined;
  const passingThreshold = module.module.passingThreshold || 0;
  const { nextLessonId, nextLessonUrl, nextLessonText } = getNextPageLink(
    module,
    page,
    project,
    mIdx,
    lIdx
  );
  const quizAttempt = createQuizAttempts(id, page);

  if (!page.lesson.attempts) {
    page.lesson.attempts = [];
  }

  page.lesson.attempts.splice(0, 0, quizAttempt);

  const controller = new Scrowl.core.scroll.Controller();
  const hasStarted = stateHooks.Course.useHasStarted();
  const toggleStarted = stateHooks.Course.useToggleStarted();
  let pageSlides: Array<ProjectSlide> = [];

  if (!hasStarted && runtime) {
    const [_courseStartError, suspendData] = runtime.getSuspendData();
    const parsedData = JSON.parse(suspendData);

    if (parsedData) {
      const parsedKeys = Object.keys(parsedData);

      if (parsedKeys.length) {
        toggleStarted(parsedData.courseStarted || false);
      }
    }
  }

  if (!hasStarted) {
    pageSlides = [page.slides[0]];
  } else {
    pageSlides = page.slides.slice();
  }

  const updateCourseProgress = useCallback(() => {
    let lessonsArray: { index: number; targetId: string; lesson: any }[] = [];
    let counter = 1;
    const currentLesson = lessonsArray.find((lesson) => {
      return lesson.targetId === id;
    });
    const currentLessonIndex = currentLesson?.index;
    const totalLessons = lessonsArray.length;
    let percentageCompleted;

    if (currentLessonIndex) {
      percentageCompleted = currentLessonIndex / totalLessons;

      if (runtime) {
        runtime.updateProgress(percentageCompleted);
      }
    }

    project.outlineConfig.forEach((module, mIdx) => {
      module.lessons.forEach((lesson, lIdx) => {
        const lessonObj = {
          index: counter,
          targetId: `module-${mIdx}--lesson-${lIdx}`,
          lesson: lesson,
        };
        counter++;
        lessonsArray.push(lessonObj);
      });
    });

    if (window['API_1484_11']) {
      window['API_1484_11'].SetValue(
        'cmi.progress_measure',
        percentageCompleted
      );
    }
  }, [project, id]);

  const finishCourse = useCallback(() => {
    if (runtime) {
      runtime.finish();
    }

    if (window['API_1484_11']) {
      window['API_1484_11'].SetValue('cmi.score.raw', 90);
      window['API_1484_11'].SetValue('cmi.score.min', 70);
      window['API_1484_11'].SetValue('cmi.score.max', 100);
      window['API_1484_11'].SetValue('cmi.score.scaled', 90 / 100);
      window['API_1484_11'].SetValue('cmi.success_status', 'passed');
      window['API_1484_11'].SetValue('cmi.completion_status', 'completed');
      window['API_1484_11'].SetValue('cmi.progress_measure', 1);
    }
  }, []);

  useEffect(() => {
    return () => {
      controller.destroy(true);
    };
  }, []);

  return (
    <BoundaryError>
      <NavBar slides={page.slides} pageId={id} project={project} />
      <div className="owlui-lesson">
        <Suspense fallback={<div>Loading...</div>}>
          <Page
            id={id}
            slides={pageSlides}
            templates={templateList}
            slideId={slideId}
            lesson={page.lesson}
            passingThreshold={passingThreshold}
            controller={controller}
          />
        </Suspense>

        <Scrowl.core.Template
          className="owlui-last"
          id={`slide-end-${id}`}
          controller={controller}
          notScene={true}
        >
          <div className={css.nextLessonContainer}>
            {lIdx < module.lessons.length - 1 ||
            mIdx < project.outlineConfig.length - 1 ? (
              <Link to={nextLessonUrl} onClick={updateCourseProgress}>
                {nextLessonText}
              </Link>
            ) : (
              <Scrowl.ui.Button onClick={finishCourse}>
                Finish Course
              </Scrowl.ui.Button>
            )}
          </div>
        </Scrowl.core.Template>
      </div>
    </BoundaryError>
  );
};

const makePageDefinition = ({
  ...props
}: {
  id: string;
  url: string;
  module: PlayerRootConfig;
  mIdx: number;
  page: PlayerRootLesson;
  lIdx: number;
  slideId: string;
  templateList: PlayerTemplateList;
  project: ProjectConfig;
}) => {
  return () => {
    return <PageContainer {...props} />;
  };
};

export const create = (
  project: ProjectConfig,
  templateList: PlayerTemplateList,
  slideId: string
) => {
  const data: Array<PageDefinition> = [];

  project.outlineConfig.forEach((module, mIdx) => {
    module.lessons.forEach((page, lIdx) => {
      const id = `module-${mIdx}--lesson-${page.lesson.id}`;
      const url = `/${id}`;

      data.push({
        module: module.module,
        lesson: page.lesson,
        url,
        Element: makePageDefinition({
          id,
          url,
          module,
          mIdx,
          page,
          lIdx,
          slideId,
          templateList,
          project,
        }),
      });
    });
  });

  return data;
};

export default {
  create,
};
