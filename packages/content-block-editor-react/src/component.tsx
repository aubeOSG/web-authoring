import React, { useRef, useEffect, useCallback } from 'react';
import {
  BlockEditorConfig,
  BlockEditorProps,
  BlockEditorClass,
  BlockEditorAPI,
  BlockEditorMutationEvent,
  BlockEditorOutputData,
} from './component.types';
import BlockEditorFactory from './block-editor';

const BlockEditorElement = ({
  defaultValue,
  value,
  onInit,
  onChange,
  id,
  ...props
}: BlockEditorProps) => {
  const factory = useCallback((config: BlockEditorConfig) => {
    return new BlockEditorFactory(config);
  }, []);
  const elemId = id.toString();
  const idRef = useRef<string>('');
  const holderRef = useRef<HTMLDivElement>(null);
  const editorJS = useRef<BlockEditorClass | null>(null);
  const startingValue = useRef<BlockEditorOutputData | undefined>(undefined);
  const customEventMap = {
    mutation: 'block-editor-mutation',
    ready: 'block-editor-ready',
  };

  useEffect(() => {
    const handleMutation = (ev) => {
      if (!onChange) {
        return;
      }

      onChange(ev.detail.api, ev.detail.ev);
    };

    document.addEventListener(customEventMap.mutation, handleMutation);

    return () => {
      document.removeEventListener(customEventMap.mutation, handleMutation);
    };
  }, [onChange]);

  useEffect(() => {
    const handleReady = (ev) => {
      if (!onInit) {
        return;
      }

      if (!editorJS.current) {
        return;
      }

      onInit(editorJS.current);
    };

    document.addEventListener(customEventMap.ready, handleReady);

    return () => {
      document.removeEventListener(customEventMap.ready, handleReady);
    };
  }, [onInit]);

  useEffect(() => {
    if (!holderRef.current) {
      console.info('block-editor::no holder ref');
      return;
    }

    if (idRef.current === elemId) {
      return;
    }

    idRef.current = elemId;
    editorJS.current = factory({
      holder: holderRef.current,
      onChange: (
        api: BlockEditorAPI,
        ev: BlockEditorMutationEvent | BlockEditorMutationEvent[]
      ) => {
        const mutationEvent = new CustomEvent(customEventMap.mutation, {
          detail: {
            api,
            ev,
          },
        });

        document.dispatchEvent(mutationEvent);
      },
      onReady: () => {
        const readyEvent = new CustomEvent(customEventMap.ready);

        document.dispatchEvent(readyEvent);
      },
      ...(defaultValue && { data: defaultValue }),
      ...props,
    });
  }, [elemId, holderRef.current, idRef.current]);

  useEffect(() => {
    return () => {
      if (editorJS.current) {
        editorJS.current.destroy();
      }
    };
  }, [elemId]);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (!editorJS.current) {
      return;
    }

    editorJS.current.render(value);
  }, [value]);

  return <div ref={holderRef} id={id.toString()} />;
};

const BlockEditorWrapper = ({
  defaultValue,
  id,
  ...props
}: BlockEditorProps) => {
  const startingValue = useRef<BlockEditorOutputData | undefined>(undefined);
  const idRef = useRef<number>(-1);

  if (id !== idRef.current) {
    idRef.current = id;
    startingValue.current = defaultValue;
  }

  return (
    <BlockEditorElement
      defaultValue={startingValue.current}
      id={id}
      {...props}
    />
  );
};

export { BlockEditorWrapper };

export default BlockEditorWrapper;
