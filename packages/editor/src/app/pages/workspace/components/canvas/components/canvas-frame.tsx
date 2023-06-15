import React from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';

export const CanvasFrame = () => {
  return (
    <div className={css.canvasFrame}>
      <Error>
        <BlockEditor />
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
