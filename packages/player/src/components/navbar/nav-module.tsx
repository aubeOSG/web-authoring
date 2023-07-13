import React, { useState, useCallback } from 'react';
import { Collapse } from 'react-bootstrap';
import utils from '../../utils';
//@ts-ignore
import * as _css from './_navbar.scss';
import { Course } from '../../hooks/state';
import type { ProjectLesson } from '../../root';

const css = utils.css.removeMapPrefix(_css);

export const NavModule = ({ config, mIdx, onChange }) => {
  const Scrowl = window['Scrowl'];
  const [isOpen, setIsOpen] = useState(true);
  const currentLesson = Course.useCurrentLesson();
  const updateCurrentLesson = Course.useUpdateCurrentLesson();

  const handleLessonSelect = useCallback((lesson: ProjectLesson) => {
    updateCurrentLesson(lesson);

    if (onChange) {
      onChange();
    }
  }, []);

  return (
    <div>
      <div className={css.moduleButton}>
        <span
          className={`material-symbols-outlined ${
            isOpen ? css.iconExpanded : css.icon
          }`}
        >
          chevron_right
        </span>

        <h5 className={css.moduleNameExpanded}>{config.module.name}</h5>
      </div>
      <Collapse in={isOpen}>
        <ul className={css.lessonList}>
          {config.lessons.map((lesson: ProjectLesson, lIdx: number) => {
            return (
              <li key={lIdx}>
                <div
                  onClick={() => {
                    handleLessonSelect(lesson);
                  }}
                >
                  <span className={css.lessonButton}>
                    <span
                      className={`material-symbols-outlined ${css.lessonIconActive}`}
                    >
                      arrow_drop_down_circle
                    </span>

                    <p
                      className={`${css.lessonLink} ${
                        currentLesson && currentLesson.id === lesson.id
                          ? css.lessonLinkActive
                          : ''
                      }`}
                    >
                      {lesson.name}
                    </p>
                  </span>
                </div>
              </li>
            );
          })}
          {isOpen ? <hr /> : ''}
        </ul>
      </Collapse>
    </div>
  );
};

export default {
  NavModule,
};
