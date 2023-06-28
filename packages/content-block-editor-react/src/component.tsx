import React, { useRef, useEffect, useCallback } from 'react';
import {
  BlockEditorConfig,
  BlockEditorProps,
  BlockEditorClass,
  BlockEditorAPI,
  BlockEditorMutationEvent,
} from './component.types';
import BlockEditorFactory from './block-editor';

const BlockEditor = ({
  defaultValue,
  value,
  onInit,
  onChange,
  ...props
}: BlockEditorProps) => {
  const factory = useCallback((config: BlockEditorConfig) => {
    return new BlockEditorFactory(config);
  }, []);
  const holderRef = useRef<HTMLDivElement>(null);
  const editorJS = useRef<BlockEditorClass | null>(null);
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

    if (editorJS.current) {
      return;
    }
    console.log('lesson testing :: editor - new factory');
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

    // return () => {
    //   if (editorJS.current) {
    //     console.log('destroying editor');
    //     editorJS.current.destroy();
    //   }
    // };
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

  useEffect(() => {
    console.log('lesson testing :: editor - id and ref has changed');
  }, [props.id, holderRef]);

  return <div ref={holderRef} {...props} />;
};

export { BlockEditor };

export default BlockEditor;
