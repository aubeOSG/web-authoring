import React, { useEffect, useRef } from 'react';
import { BlockEditorClass } from './component.types';
import api from './api';

export const EditorElement = () => {
  const holderRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<BlockEditorClass | null>(null);

  useEffect(() => {
    if (!holderRef.current) {
      return;
    }

    editorRef.current = new api({
      holder: holderRef.current,
      onReady() {
        const readyEvent = new CustomEvent('block-editor-stateless-ready', {
          detail: {
            api: editorRef.current,
          },
        });

        document.dispatchEvent(readyEvent);
      },
      readOnly: true,
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, [holderRef]);

  return <div ref={holderRef} />;
};

export default EditorElement;
