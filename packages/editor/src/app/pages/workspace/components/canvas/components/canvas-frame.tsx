import React, { useEffect, useRef, useState } from 'react';
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
  const frameRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<BlockEditorClass>();
  const [isApiReady, setIsApiReady] = useState(false);
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
      setIsApiReady(true);

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
  }, [activeLesson, isApiReady]);

  useEffect(() => {
    const frameElem = frameRef.current;
    const editorElem = editorRef.current;
    const api = apiRef.current;

    if (!frameElem || !editorElem || !api) {
      return;
    }

    const handleEditorAutoFocus = (ev: MouseEvent) => {
      console.log('ev', ev);
      const editableZone = editorElem.querySelector(
        '.codex-editor__redactor'
      ) as HTMLDivElement;
      const toolbar = editorElem.querySelector('.ce-toolbar') as HTMLDivElement;
      const inlineTools = editorElem.querySelector(
        '.ce-inline-toolbar'
      ) as HTMLDivElement;
      const focusedElem = ev.target as HTMLElement;

      if (
        editableZone.contains(focusedElem) ||
        toolbar.contains(focusedElem) ||
        inlineTools.contains(focusedElem)
      ) {
        return;
      }

      api.focus();
    };

    frameElem.addEventListener('click', handleEditorAutoFocus);

    return () => {
      frameElem.removeEventListener('click', handleEditorAutoFocus);
    };
  }, [isApiReady]);

  return (
    <div className={css.canvasFrame} ref={frameRef}>
      <Error>
        {activeLesson && activeLesson.id !== -1 ? (
          <BlockEditor ref={editorRef} />
        ) : (
          <></>
        )}
      </Error>
    </div>
  );
};

export default {
  CanvasFrame,
};
