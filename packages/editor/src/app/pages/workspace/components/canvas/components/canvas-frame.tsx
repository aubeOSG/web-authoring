import React, { useCallback } from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import type {
  BlockEditorAPI,
  BlockEditorMutationEvent,
} from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';

export const CanvasFrame = () => {
  const onChange = useCallback(
    (
      api: BlockEditorAPI,
      ev: BlockEditorMutationEvent | BlockEditorMutationEvent[]
    ) => {
      api.saver.save().then((data) => {
        console.log('save data', data);
      });
    },
    []
  );

  return (
    <div className={css.canvasFrame}>
      <Error>
        <BlockEditor onChange={onChange} />
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
