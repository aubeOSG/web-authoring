import React, { useRef, useCallback } from 'react';
// create editor instance
import { createReactEditorJS } from 'react-editor-js';
import Header from '@editorjs/header';

export const Editor = ({ data, setData }) => {
  const editorCore = useRef(null);
  const ReactEditorJS = createReactEditorJS();

  const handleInitialize = useCallback((instance) => {
    // await instance._editorJS.isReady;
    instance._editorJS.isReady
      .then(() => {
        // set reference to editor
        editorCore.current = instance;
      })
      .catch((err) => console.log('An error occured', err));
  }, []);

  const handleSave = useCallback(async () => {
    // retrieve data inserted
    //@ts-ignore
    const savedData = await editorCore.current.save();
    // save data
    setData(savedData);
  }, [setData]);

  const tools = {
    header: Header,
  };

  return (
    <div className="editor-container">
      <h4 className="edit-mode-alert">! Edit Mode Enabled</h4>
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={tools}
        onChange={handleSave}
        defaultValue={data}
      />
    </div>
  );
};

export default {
  Editor,
};
