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
  id,
  ...props
}: BlockEditorProps) => {
  const logCallout = '\n\n---------\n\n';
  const factory = useCallback((config: BlockEditorConfig) => {
    return new BlockEditorFactory(config);
  }, []);
  const idRef = useRef<string | number>(id || '');
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

  console.log('hey hey');

  useEffect(() => {
    console.log('helloworld');
    if (!holderRef.current) {
      console.info('block-editor::no holder ref');
      return;
    }

    if (idRef.current === id) {
      return;
    }

    console.log(logCallout);
    console.log('hey hey');
    console.log('lesson testing :: editor - id and ref has changed');
    console.log('idRef', idRef.current);
    console.log('id og', id);
    console.log('holderRef', holderRef.current);
    console.log('editor instance', editorJS);
    console.log(logCallout);

    console.log('lesson testing :: editor - new factory');
    idRef.current = id || '';
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

    return () => {
      if (editorJS.current) {
        console.log('destroying editor');
        editorJS.current.destroy();
      }
    };
  }, [id, holderRef.current]);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (!editorJS.current) {
      return;
    }

    editorJS.current.render(value);
  }, [value]);

  console.log('lesson testing :: editor - rendering', props);

  return <div ref={holderRef} id={id} />;
};

export { BlockEditor };

export default BlockEditor;
