import React, { useRef, useEffect, useCallback } from 'react';
import {
  BlockEditorConfig,
  BlockEditorProps,
  BlockEditorClass,
} from './component.types';
import BlockEditorFactory from './block-editor';

const BlockEditor = ({
  holder,
  defaultValue,
  value,
  onInit,
  children,
  ...props
}: BlockEditorProps) => {
  const factory = useCallback((config: BlockEditorConfig) => {
    return new BlockEditorFactory(config);
  }, []);
  const holderRef = useRef(
    holder || `content-block-editor-${Date.now().toString(16)}`
  );
  const editorJS = useRef<BlockEditorClass | null>(null);

  useEffect(() => {
    editorJS.current = factory({
      holder: holderRef.current,
    });

    if (onInit) {
      onInit(editorJS.current);
    }

    return () => {
      editorJS.current?.destroy;
    };
  }, []);

  return children || <div id={holderRef.current} />;
};

export { BlockEditor };

export default BlockEditor;
