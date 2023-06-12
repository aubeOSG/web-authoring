import React, { Suspense, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { hasProp } from '@scrowl/utils';
import { PageDefinition } from './pages.types';
import {
  PlayerRootConfig,
  PlayerRootLesson,
  PlayerTemplateList,
  ProjectConfig,
  ProjectLesson,
  ProjectModule,
} from '../../root/root.types';
import utils from '../../utils';
// @ts-ignore
import * as _css from '../../root/_root.scss';
import { NavBar } from '../../components/navbar';
import { Page } from './page';

const css = utils.css.removeMapPrefix(_css);

const finishCourse = () => {
  const Scrowl = window['Scrowl'];

  if (Scrowl.runtime) {
    Scrowl.runtime.finish();
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
};

const getNextPageLink = () => {
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

const makePageDefinition = ({
  id,
  url,
  module,
  mIdx,
  page,
  lIdx,
  slideId,
  templateList,
  project,
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
  const updateCourseProgress = useCallback(() => {
    const Scrowl = window['Scrowl'];
    const runtime = hasProp(Scrowl, 'runtime') ? Scrowl.runtime : undefined;
    let lessonsArray: { index: number; targetId: string; lesson: any }[] = [];
    let counter = 1;
    const currentLesson = lessonsArray.find((lesson) => {
      return lesson.targetId === id;
    });
    const currentLessonIndex = currentLesson?.index;
    const totalLessons = lessonsArray.length;
    let percentageCompleted;
    const passingThreshold = module.module.passingThreshold;
    const controller = new Scrowl.core.scroll.Controller();

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

  return () => {
    return (
      <>
        <NavBar slides={page.slides} pageId={id} project={project} />
        <div className="owlui-lesson">
          <Suspense fallback={<div>Loading...</div>}>
            <Page
              id={id}
              slides={page.slides}
              templates={templateList}
              slideId={slideId}
              lesson={page.lesson}
              passingThreshold={passingThreshold}
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
      </>
    );
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
