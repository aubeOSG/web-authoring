import React from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';

export const CanvasFrame = () => {
  return (
    <Error>
      <BlockEditor />
    </Error>
  );
};

export default {
  CanvasFrame,
};
