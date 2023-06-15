import React, { useRef, useEffect, useCallback } from 'react';
import {
  BlockEditorConfig,
  BlockEditorProps,
  BlockEditorClass,
} from './component.types';
import BlockEditorFactory from './block-editor';

const BlockEditor = ({
  defaultValue,
  value,
  onInit,
  ...props
}: BlockEditorProps) => {
  const factory = useCallback((config: BlockEditorConfig) => {
    return new BlockEditorFactory(config);
  }, []);
  const holderRef = useRef<HTMLDivElement>(null);
  const editorJS = useRef<BlockEditorClass | null>(null);

  useEffect(() => {
    if (!holderRef.current) {
      return;
    }

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
  }, [holderRef.current]);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (!editorJS.current) {
      return;
    }

    editorJS.current.render(value);
  }, [value]);

  return <div ref={holderRef} />;
};

export { BlockEditor };

export default BlockEditor;
