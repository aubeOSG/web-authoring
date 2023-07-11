import React, { useRef, useEffect } from 'react';
import {
  BlockEditorClass,
  BlockEditorAPI,
  BlockEditorMutationEvent,
} from './component.types';
import api from './api';

export const editorEventMap = {
  mutation: 'block-editor-mutation',
  ready: 'block-editor-ready',
};

export const BlockEditorElement = () => {
  const holderRef = useRef(
    `editorjs-${new Date().valueOf().toString().slice(-8)}`
  );
  const editorRef = useRef<BlockEditorClass | null>(null);

  useEffect(() => {
    if (!holderRef.current) {
      console.info('block-editor::no holder ref');
      return;
    }

    editorRef.current = new api({
      holder: holderRef.current,
      onChange: (
        api: BlockEditorAPI,
        ev: BlockEditorMutationEvent | BlockEditorMutationEvent[]
      ) => {
        const mutationEvent = new CustomEvent(editorEventMap.mutation, {
          detail: {
            api,
            ev,
          },
        });

        document.dispatchEvent(mutationEvent);
      },
      onReady: () => {
        const readyEvent = new CustomEvent(editorEventMap.ready, {
          detail: {
            api: editorRef.current,
          },
        });

        document.dispatchEvent(readyEvent);
      },
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  return <div className="owlui-editor" id={holderRef.current} />;
};

export default BlockEditorElement;
