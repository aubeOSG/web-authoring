import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import utils from '../../utils';
//@ts-ignore
import * as _css from './_navbar.scss';
import { useCurrentLesson } from '../../hooks/state/course';

const css = utils.css.removeMapPrefix(_css);

export const NavModule = ({ config, mIdx }) => {
  const Scrowl = window['Scrowl'];
  const [isOpen, setIsOpen] = useState(true);
  const currentLesson = useCurrentLesson();

  return (
    <div>
      <div className={css.moduleButton}>
        <Scrowl.ui.Icon
          icon="chevron_right"
          display="outlined"
          className={isOpen ? css.iconExpanded : css.icon}
        />
        <h5 className={css.moduleNameExpanded}>{config.module.name}</h5>
      </div>
      <Collapse in={isOpen}>
        <ul className={css.lessonList}>
          {config.lessons.map((lesson, lIdx) => {
            const id = `module-${mIdx}--lesson-${lesson.lesson.id}`;
            const lessonName = lesson.lesson.name;

            return (
              <li key={lIdx}>
                <div>
                  <span className={css.lessonButton}>
                    <Scrowl.ui.Icon
                      icon="arrow_drop_down_circle"
                      display="outlined"
                      className={css.lessonIconActive}
                    />
                    <p
                      className={`${css.lessonLink} ${
                        currentLesson.index === lIdx ? css.lessonLinkActive : ''
                      }`}
                    >
                      {lessonName}
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
