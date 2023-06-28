import React from 'react';
import * as css from './_canvas.scss';
import { CanvasFrame, CanvasBreadcrumb } from './components';
import { useActiveLesson } from '../../page-workspace-hooks';

export const Canvas = () => {
  const activeLesson = useActiveLesson();

  return (
    <div className={css.canvas}>
      {activeLesson && activeLesson.content ? (
        <CanvasFrame activeLesson={activeLesson} />
      ) : (
        <div>Loading...</div>
      )}
      <CanvasBreadcrumb />
    </div>
  );
};

export default {
  Canvas,
};
