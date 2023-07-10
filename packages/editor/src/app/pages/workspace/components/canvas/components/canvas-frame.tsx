import React, { useCallback, useEffect, useRef } from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import type {
  BlockEditorAPI,
  BlockEditorClass,
  BlockEditorMutationEvent,
} from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';
import { setActiveLesson } from '../../../page-workspace-hooks';
import { Projects } from '../../../../../models';

export const CanvasFrame = ({ activeLesson }) => {
  const idRef = useRef(activeLesson.id);
  const apiRef = useRef<BlockEditorClass>();
  const onInit = useCallback(
    (api: BlockEditorClass) => {
      apiRef.current = api;
      apiRef.current.render(activeLesson.content);
    },
    [activeLesson.id]
  );
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

  useEffect(() => {
    if (!apiRef.current) {
      return;
    }

    if (idRef.current === activeLesson.id) {
      return;
    }

    apiRef.current.render(activeLesson.content);
    idRef.current = activeLesson.id;
  }, [apiRef.current, activeLesson.id]);

  return (
    <div className={css.canvasFrame}>
      <Error>
        <BlockEditor onChange={onChange} onInit={onInit} />
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
