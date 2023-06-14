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
      ...(defaultValue && { data: defaultValue }),
      ...props,
    });

    if (onInit) {
      onInit(editorJS.current);
    }

    return () => {
      if (editorJS.current) {
        editorJS.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (!editorJS.current) {
      return;
    }

    editorJS.current.render(value);
  }, [value]);

  return children || <div id={holderRef.current} />;
};

export { BlockEditor };

export default BlockEditor;
