import React from 'react';
import * as css from './_canvas.scss';
import { CanvasFrame, CanvasBreadcrumb } from './components';
import { ui } from '@scrowl/ui';
import { Workspaces } from '../../../../models';

export const CollapsePaneButton = () => {
  const workspaceSettings = Workspaces.useSettings();

  const handleClick = () => {
    Workspaces.setSettings({
      paneCollapsed: !workspaceSettings.paneCollapsed,
    });
  };
  return (
    <ui.Button
      className={css.canvasCollapseButton}
      variant="primary"
      onClick={handleClick}
    >
      <span
        className={`material-symbols-rounded ${
          workspaceSettings.paneCollapsed ? 'collapsed' : 'expanded'
        }`}
      >
        login
      </span>
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
