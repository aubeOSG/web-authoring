import React from 'react';
import * as css from './_canvas.scss';
import { CanvasFrame, CanvasBreadcrumb } from './components';

export const Canvas = () => {
  return (
    <div className={css.canvas}>
      <CanvasFrame />
      <CanvasBreadcrumb />
    </div>
  );
};

export default {
  Canvas,
};
