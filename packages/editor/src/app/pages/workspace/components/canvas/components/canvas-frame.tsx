import React, { useCallback } from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import type {
  BlockEditorAPI,
  BlockEditorMutationEvent,
} from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';
import {
  useActiveLesson,
  setActiveLesson,
} from '../../../page-workspace-hooks';

export const CanvasFrame = () => {
  const activeLesson = useActiveLesson();
  const onChange = useCallback(
    (
      api: BlockEditorAPI,
      ev: BlockEditorMutationEvent | BlockEditorMutationEvent[]
    ) => {
      api.saver.save().then((data) => {
        const { content, ...lesson } = activeLesson;

        setActiveLesson({
          content: data,
          ...lesson,
        });
      });
    },
    [activeLesson]
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
