import React, { useEffect, useRef } from 'react';
import {
  BlockEditor,
  editorEventMap,
} from '@scrowl/content-block-editor-react';
import type { BlockEditorClass } from '@scrowl/content-block-editor-react';
import * as css from '../_canvas.scss';
import { Error } from '../../../../../components';
import {
  useActiveLesson,
  setActiveLesson,
} from '../../../page-workspace-hooks';
import { Projects } from '../../../../../models';

export const CanvasFrame = () => {
  const apiRef = useRef<BlockEditorClass>();
  const activeLesson = useActiveLesson();
  const idRef = useRef(activeLesson.id);

  useEffect(() => {
    if (activeLesson.id === -1) {
      return;
    }

    if (!apiRef.current) {
      return;
    }

    if (idRef.current === activeLesson.id) {
      return;
    }

    if (activeLesson.content.blocks.length) {
      apiRef.current.render(activeLesson.content);
    } else {
      apiRef.current.clear();
    }

    idRef.current = activeLesson.id;
  }, [activeLesson, apiRef]);

  useEffect(() => {
    const handleReady = (ev) => {
      apiRef.current = ev.detail.api;
      idRef.current = activeLesson.id;

      if (activeLesson.content.blocks.length) {
        apiRef.current?.render(activeLesson.content);
      }
    };

    const handleMutation = (ev) => {
      ev.detail.api.saver.save().then((data) => {
        const { content, ...lesson } = activeLesson;
        const lessonUpdate = {
          content: data,
          ...lesson,
        };

        setActiveLesson(lessonUpdate);
        Projects.setLesson(lessonUpdate);
      });
    };

    document.addEventListener(editorEventMap.ready, handleReady);
    document.addEventListener(editorEventMap.mutation, handleMutation);

    return () => {
      document.removeEventListener(editorEventMap.ready, handleReady);
      document.removeEventListener(editorEventMap.mutation, handleMutation);
    };
  }, [activeLesson]);

  return (
    <div className={css.canvasFrame}>
      <Error>
        {activeLesson && activeLesson.id !== -1 ? <BlockEditor /> : <></>}
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
