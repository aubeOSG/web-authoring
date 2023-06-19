import React from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';

export const CanvasFrame = () => {
  return (
    <div>
      <BlockEditor />
    </div>
  );
};

export default {
  CanvasFrame,
};
