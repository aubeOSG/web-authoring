import React, { useCallback } from 'react';
import * as css from './_canvas.scss';
import { CanvasFrame, CanvasBreadcrumb } from './components';
import { ui } from '@scrowl/ui';
import { Workspaces } from '../../../../models';

export const CollapsePaneButton = () => {
  const workspaceSettings = Workspaces.useSettings();

  const handleClick = useCallback(() => {
    Workspaces.setSettings({
      paneCollapsed: !workspaceSettings.paneCollapsed,
    });
  }, [workspaceSettings]);

  return (
    <ui.Button
      className={css.canvasCollapseButton}
      variant="ghost"
      onClick={handleClick}
    >
      <span
        className={`material-symbols-rounded ${
          workspaceSettings.paneCollapsed ? 'collapsed' : 'expanded'
        }`}
      >
        logout
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
