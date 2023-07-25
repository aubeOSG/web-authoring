import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  BlockEditorClass,
  BlockEditorStateless,
} from '@scrowl/content-block-editor-react';
import * as _css from './_page.scss';
import { List, hasProp } from '@scrowl/utils';
import { PageProps } from './page.types';
import { BoundaryError } from '../';
import { Course } from '../../hooks/state';
import utils from '../../utils';
import { ProjectConfig, ProjectLesson } from '../../root';
import EndButton from './end-button';

const css = utils.css.removeMapPrefix(_css);

const checkLastLesson = (lesson: ProjectLesson, config: ProjectConfig) => {
  const configIdx = List.indexBy(
    config.outlineConfig,
    'module.id',
    lesson.moduleId
  );
  const lastLesson = config.outlineConfig[configIdx].lessons.slice(-1)[0];

  return lesson.id === lastLesson.id;
};

export const Page = ({ project, config }: PageProps) => {
  const Scrowl = window['Scrowl'];
  const runtime = hasProp(Scrowl, 'runtime') ? Scrowl.runtime : undefined;
  const scorm2004 = hasProp(window, 'API_1484_11')
    ? window['API_1484_11']
    : undefined;
  const currentLesson = Course.useCurrentLesson();
  const updateLesson = Course.useUpdateCurrentLesson();
  const editorRef = useRef<BlockEditorClass | null>(null);
  const [isLastLesson, setIsLastLesson] = useState(false);
  const endLesson = project.lessons?.slice(-1)[0];
  const [isEndLesson, setIsEndLesson] = useState(false);
  const editorAPIRef = useRef<BlockEditorClass | null>();
  const editorReadyEv = 'block-editor-stateless-ready';

  const onEndCourse = useCallback(() => {
    if (runtime) {
      runtime.finish();
    }

    if (scorm2004) {
      scorm2004.SetValue('cmi.score.raw', 90);
      scorm2004.SetValue('cmi.score.min', 70);
      scorm2004.SetValue('cmi.score.max', 100);
      scorm2004.SetValue('cmi.score.scaled', 90 / 100);
      scorm2004.SetValue('cmi.success_status', 'passed');
      scorm2004.SetValue('cmi.completion_status', 'completed');
      scorm2004.SetValue('cmi.progress_measure', 1);
    }
  }, []);

  const onNextLesson = useCallback(() => {
    if (!currentLesson || !project.lessons) {
      return;
    }

    const currentIdx = List.indexBy(project.lessons, 'id', currentLesson.id);
    const nextIdx = currentIdx + 1;
    const nextLesson = project.lessons[nextIdx];
    const totalLessons = project.lessons.length;
    const completeness = nextIdx / totalLessons;

    if (runtime) {
      runtime.updateProgress(completeness);
    }

    if (scorm2004) {
      scorm2004.SetValue('cmi.progress_measure', completeness);
    }

    updateLesson(nextLesson);
  }, [currentLesson]);

  useEffect(() => {
    const cleanUp = () => {
      document.documentElement.style.setProperty('--scrollType', 'none');

      const resetScrollType = () => {
        setTimeout(() => {
          if (window.scrollY === 0) {
            document.documentElement.style.setProperty(
              '--scrollType',
              'smooth'
            );
          } else {
            resetScrollType();
          }
        }, 250);
      };

      setTimeout(() => {
        window.scrollTo(0, 0);
        resetScrollType();
      }, 1);
    };

    if (!currentLesson || currentLesson.id === -1) {
      return cleanUp;
    }

    setIsLastLesson(checkLastLesson(currentLesson, config));
    setIsEndLesson(currentLesson.id === endLesson?.id);

    if (!editorRef.current) {
      return cleanUp;
    }

    editorRef.current.render(currentLesson.content);
    return cleanUp;
  }, [currentLesson, config]);

  useEffect(() => {
    const handleReady = (e) => {
      const api = e.detail.api;

      editorAPIRef.current = api;

      if (currentLesson.id !== -1) {
        api.render(currentLesson.content);
      }
    };

    if (editorAPIRef.current && currentLesson.id !== -1) {
      editorAPIRef.current.render(currentLesson.content);
    }

    document.addEventListener(editorReadyEv, handleReady);

    return () => {
      document.removeEventListener(editorReadyEv, handleReady);
    };
  }, [currentLesson, editorAPIRef.current]);

  return (
    <BoundaryError>
      <section className={css.page}>
        <div className={css.lessonContainer}>
          {currentLesson && currentLesson.id !== -1 ? (
            <BlockEditorStateless />
          ) : (
            <></>
          )}
        </div>

        <div className={css.lessonEnd}>
          <EndButton
            isEnd={isEndLesson}
            isLast={isLastLesson}
            onEnd={onEndCourse}
            onNext={onNextLesson}
          />
        </div>
      </section>
    </BoundaryError>
  );
};

export default Page;
