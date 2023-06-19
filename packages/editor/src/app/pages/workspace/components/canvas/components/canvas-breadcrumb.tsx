import React from 'react';
import { motion } from 'framer-motion';
import { ui } from '@scrowl/ui';
import * as css from '../_canvas.scss';
import { Settings, Projects } from '../../../../../models';
import { events } from '../../../../../services';

export const CanvasBreadcrumb = () => {
  const animationSettings = Settings.useAnimation();
  const reducedAnimations = animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;

  /*
  FIXME:slide-removal
  <>
            <li className="breadcrumb-item">
              <button className="breadcrumb-item__content" disabled>
                <ui.Icon
                  icon="folder"
                  display="sharp"
                  filled={true}
                  grad={200}
                  opsz={20}
                  appearance="Module"
                />
                {module && module.name}
              </button>
            </li>
            <li className="breadcrumb-item">
              <button className="breadcrumb-item__content" disabled>
                <ui.Icon
                  icon="interests"
                  display="sharp"
                  filled={true}
                  grad={200}
                  opsz={20}
                  appearance="Lesson"
                />
                {lesson && lesson.name}
              </button>
            </li>
            <li className="breadcrumb-item active dropup" aria-current="page">
              <button
                className="breadcrumb-item__content dropdown-toggle active"
                onClick={handleSlideFocus}
                onContextMenu={handleSlideFocus}
              >
                <ui.Icon
                  icon="rectangle"
                  display="outlined"
                  opsz={20}
                  grad={200}
                  appearance="Slide"
                />
                {slide && slide.name}
              </button>
            </li>
          </>
  */

  return (
    <motion.nav
      className={`${css.canvasBreadcrumb} navbar fixed-bottom`}
      aria-label="breadcrumb"
      style={reducedAnimations ? {} : { transform: 'translate(0,32px)' }}
      initial={reducedAnimations ? {} : { transform: 'translate(0,32px)' }}
      animate={
        reducedAnimations
          ? {}
          : {
              transform: 'translate(0,0px)',
              transition: { delay: animationDelay, duration: 0.4 },
            }
      }
    >
      <ol className={`${css.canvasBreadcrumbList} breadcrumb`}>
        <li className="breadcrumb-item active dropup" aria-current="page">
          <button
            className="breadcrumb-item__content dropdown-toggle"
            style={{
              textDecoration: 'none',
              pointerEvents: 'none',
            }}
          >
            <ui.Icon
              icon="rectangle"
              display="outlined"
              opsz={20}
              grad={200}
              appearance="Slide"
            />
            No slide selected...
          </button>
        </li>
      </ol>
    </motion.nav>
  );
};

export default {
  CanvasBreadcrumb,
};
