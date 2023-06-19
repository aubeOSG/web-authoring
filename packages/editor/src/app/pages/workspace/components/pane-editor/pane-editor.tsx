import React from 'react';
import { ui } from '@scrowl/ui';
import * as css from './_pane-editor.scss';
import { Pane } from '../../../../components';
import { Settings } from '../../../../models';

export const PaneEditor = () => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const animationOpts = {
    initial: !isAnimated
      ? {}
      : {
          boxShadow: '30px 0 0px 0 var(--owl-sidebar-bg)',
          transform: 'translate(350px ,0px)',
        },
    animate: !isAnimated
      ? {}
      : {
          marginBottom: '0px',
          transform: 'translate(0px,0px)',
          transition: {
            marginBottom: { delay: animationDelay, duration: 0.4 },
            transform: { delay: animationDelay },
          },
          transitionEnd: { boxShadow: '' },
        },
  };

  return (
    <Pane
      initial={animationOpts.initial}
      animate={animationOpts.animate}
      side="right"
    >
      <div className={css.paneEditorTabs}></div>
    </Pane>
  );
};

export default {
  PaneEditor,
};
