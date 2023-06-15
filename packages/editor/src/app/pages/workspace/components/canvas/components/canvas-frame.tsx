import React, { useCallback, useState, useEffect } from 'react';
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
import { Projects } from '../../../../../models';

export const CanvasFrame = () => {
  const activeLesson = useActiveLesson();
  const [isLoading, setIsLoading] = useState(true);
  const onChange = useCallback(
    (
      api: BlockEditorAPI,
      ev: BlockEditorMutationEvent | BlockEditorMutationEvent[]
    ) => {
      console.log('change', activeLesson);
      if (!activeLesson) {
        return;
      }

      api.saver.save().then((data) => {
        const { content, ...lesson } = activeLesson;
        const lessonUpdate = {
          content: data,
          ...lesson,
        };
        console.log('lessonUpdate', lessonUpdate);
        setActiveLesson(lessonUpdate);
        Projects.setLesson(lessonUpdate);
      });
    },
    [activeLesson]
  );

  useEffect(() => {
    if (activeLesson) {
      setIsLoading(false);
      console.log('activeLesson', activeLesson);
    }
  }, [activeLesson]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

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
