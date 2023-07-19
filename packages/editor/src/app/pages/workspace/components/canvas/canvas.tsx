import React from 'react';
import * as css from './_canvas.scss';
import { CanvasFrame, CanvasBreadcrumb } from './components';
import { ui } from '@scrowl/ui';
import { Workspaces } from '../../../../models';

export const CollapsePaneButton = () => {
  const workspaceData = Workspaces.useData();

  const handleClick = () => {
    Workspaces.update({ paneCollapsed: !workspaceData.paneCollapsed });
  };
  return (
    <ui.Button
      className={css.canvasCollapseButton}
      variant="primary"
      onClick={handleClick}
    >
      <span className="material-symbols-rounded">login</span>
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
