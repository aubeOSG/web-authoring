import React, { useCallback, useRef, useEffect, useState } from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import type {
  BlockEditorAPI,
  BlockEditorMutationEvent,
  BlockEditorClass,
} from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';
import { setActiveLesson } from '../../../page-workspace-hooks';
import { Projects } from '../../../../../models';

export const CanvasFrame = ({ activeLesson }) => {
  const lessonId = useRef<number | null>(activeLesson.id);
  const editorInstance = useRef<BlockEditorClass | null>(null);
  const onInit = useCallback(
    (api) => {
      editorInstance.current = api;
    },
    [activeLesson]
  );
  const onChange = useCallback(
    (
      api: BlockEditorAPI,
      ev: BlockEditorMutationEvent | BlockEditorMutationEvent[]
    ) => {
      if (!activeLesson) {
        return;
      }

      api.saver.save().then((data) => {
        const { content, ...lesson } = activeLesson;
        const lessonUpdate = {
          content: data,
          ...lesson,
        };
        setActiveLesson(lessonUpdate);
        Projects.setLesson(lessonUpdate);
        console.log('lesson update', lessonUpdate);
      });
    },
    [activeLesson]
  );

  useEffect(() => {
    if (!activeLesson.id) {
      return;
    }

    const updateEditor = () => {
      console.log('updating on lesson change');
      if (editorInstance.current) {
        editorInstance.current.render(activeLesson.content);
      }
    };

    if (lessonId.current !== activeLesson.id) {
      lessonId.current = activeLesson.id;
      updateEditor();
    }
  }, [activeLesson.id]);

  console.log('lesson testing :: app - canvas frame', activeLesson.content);

  return (
    <div className={css.canvasFrame}>
      <Error>
        <BlockEditor
          id={activeLesson.id}
          onChange={onChange}
          onInit={onInit}
          defaultValue={activeLesson.content}
        />
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
