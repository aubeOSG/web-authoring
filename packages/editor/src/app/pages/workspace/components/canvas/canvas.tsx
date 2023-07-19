import React from 'react';
import * as css from './_canvas.scss';
import { CanvasFrame, CanvasBreadcrumb } from './components';
import { ui } from '@scrowl/ui';

export const CollapsePaneButton = () => {
  const handleClick = () => {
    console.log('click');
  };
  return (
    <ui.Button
      className={css.canvasCollapseButton}
      variant="primary"
      onClick={handleClick}
    >
      <span className="material-symbols-rounded">login</span>
      Show Pane
    </ui.Button>
  );
};

export const Canvas = () => {
  return (
    <div className={css.canvas}>
      <CollapsePaneButton />
      <CanvasFrame />
      <CanvasBreadcrumb />
    </div>
  );
};

export default {
  Canvas,
};
