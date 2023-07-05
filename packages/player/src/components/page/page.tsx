import React, { useEffect, useCallback, useRef } from 'react';
import {
  BlockEditor,
  BlockEditorClass,
} from '@scrowl/content-block-editor-react';
import * as _css from './_page.scss';
import { PageProps } from './page.types';
import { BoundaryError } from '../';
import { Course } from '../../hooks/state';
import utils from '../../utils';

const css = utils.css.removeMapPrefix(_css);

export const Page = ({ project }: PageProps) => {
  const currentLesson = Course.useCurrentLesson();
  const editorRef = useRef<BlockEditorClass | null>(null);

  const onInit = useCallback(
    (editorInstance: BlockEditorClass) => {
      editorRef.current = editorInstance;

      if (currentLesson && currentLesson.id !== -1) {
        editorRef.current.render(currentLesson.content);
      }
    },
    [currentLesson]
  );

  useEffect(() => {
    if (!currentLesson || currentLesson.id === -1) {
      return;
    }

    if (!editorRef.current) {
      return;
    }

    editorRef.current.render(currentLesson.content);
  }, [currentLesson]);

  return (
    <BoundaryError>
      <section className={css.page}>
        {currentLesson && currentLesson.id !== -1 ? (
          <BlockEditor onInit={onInit} id={currentLesson.id} readOnly={true} />
        ) : (
          <></>
        )}
      </section>
    </BoundaryError>
  );
};

export default Page;
