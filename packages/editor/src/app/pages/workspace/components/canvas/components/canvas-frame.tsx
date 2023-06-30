import React, { useCallback } from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import type {
  BlockEditorAPI,
  BlockEditorMutationEvent,
} from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';
import { setActiveLesson } from '../../../page-workspace-hooks';
import { Projects } from '../../../../../models';

export const CanvasFrame = ({ activeLesson }) => {
  const onChange = useCallback(
    (
      api: BlockEditorAPI,
      ev: BlockEditorMutationEvent | BlockEditorMutationEvent[]
    ) => {
      api.saver.save().then((data) => {
        const { content, ...lesson } = activeLesson;
        const lessonUpdate = {
          content: data,
          ...lesson,
        };

        setActiveLesson(lessonUpdate);
        Projects.setLesson(lessonUpdate);
      });
    },
    [activeLesson.id]
  );

  return (
    <div className={css.canvasFrame}>
      <Error>
        <BlockEditor
          id={activeLesson.id}
          onChange={onChange}
          defaultValue={activeLesson.content}
        />
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
