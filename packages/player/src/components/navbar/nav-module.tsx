import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import utils from '../../utils';
//@ts-ignore
import * as _css from './_navbar.scss';

const css = utils.css.removeMapPrefix(_css);

export const NavModule = ({ pageId, config, mIdx }) => {
  const Scrowl = window['Scrowl'];
  const [isOpen, setIsOpen] = useState(true);

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
            const url = `/${id}`;
            const lessonName = lesson.lesson.name;

            return (
              <li key={lIdx}>
                <Link to={url}>
                  <span className={css.lessonButton}>
                    <Scrowl.ui.Icon
                      icon="arrow_drop_down_circle"
                      display="outlined"
                      className={css.lessonIconActive}
                    />
                    <p className={`${css.lessonLink}`}>{lessonName}</p>
                  </span>
                </Link>
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
