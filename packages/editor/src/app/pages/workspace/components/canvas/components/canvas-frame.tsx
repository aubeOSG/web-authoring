import React, { useCallback, useRef, useEffect, useState } from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import type {
  BlockEditorAPI,
  BlockEditorMutationEvent,
  BlockEditorClass,
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
  const [content, setContent] = useState();
  const isLoading = useRef(true);
  const editorInstance = useRef<BlockEditorClass | null>(null);
  const onInit = useCallback(
    (api) => {
      editorInstance.current = api;

      if (activeLesson.content) {
        if (!content && editorInstance.current) {
          editorInstance.current.render(activeLesson.content);
        }

        setContent(activeLesson.content);
      }
    },
    [activeLesson, content]
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
      });
    },
    [activeLesson]
  );

  useEffect(() => {
    if (!activeLesson) {
      return;
    }

    isLoading.current = false;

    if (editorInstance.current) {
      if (activeLesson.content) {
        editorInstance.current.render(activeLesson.content);
      } else {
        editorInstance.current.render({
          blocks: [],
          time: new Date().valueOf(),
          version: '2.27.0',
        });
      }
    }
  }, [activeLesson]);

  if (isLoading.current) {
    return <div>...Loading</div>;
  }

  return (
    <div className={css.canvasFrame}>
      <Error>
        {!content ? (
          <BlockEditor onChange={onChange} onInit={onInit} />
        ) : (
          <BlockEditor
            onChange={onChange}
            onInit={onInit}
            defaultValue={content}
          />
        )}
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
