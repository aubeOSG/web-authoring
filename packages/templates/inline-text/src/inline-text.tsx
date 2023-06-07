import React, { useState, useEffect, useRef } from 'react';
import './_index.scss';
import { InlineTextProps } from './inline-text.types';

const InlineText = ({ id, schema, ...props }: InlineTextProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-inline-text';
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-inline-text`;
  const text = schema.content.text.value;
  const headerText = schema.content.text.label;
  const textFocusCss = focusElement === 'text' && 'has-focus';
  const bg = schema.content.bgImage.content.bg.value;
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment === 'right' ? 'right' : 'left';
  const disableAnimations = schema.controlOptions.disableAnimations?.value;
  //@ts-ignore
  const stopUserAdvancement = schema.controlOptions.stopUserAdvacement?.value;
  const showProgressBar = schema.content.options.content.showProgress.value;
  const showProgressRef = useRef(showProgressBar);
  const slideProgress = useRef(0);
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: showProgressBar ? '0%' : '100%',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const Editor = Scrowl.core.components.Editor;
  const EditorTextParser = Scrowl.core.components.EditorTextParser;

  const INITIAL_DATA = {
    blocks: [
      {
        type: 'header',
        data: {
          text: headerText,
          level: 1,
        },
      },
      {
        type: 'paragraph',
        data: {
          text: text,
        },
      },
    ],
  };

  const [data, setData] = useState(INITIAL_DATA);

  const toggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false);
      console.log('Edit mode is now disabled');
    } else {
      setIsEditMode(true);
      console.log('Edit mode is now enabled');
    }
  };

  if (showProgressBar) {
    classes += ' show-progress';
  }

  const handleSlideProgress = (ev) => {
    slideProgress.current = ev.progress;

    if (showProgressRef.current) {
      setProgressBarStyles({
        ...progressBarStyles,
        width: `${ev.progress}%`,
      });
    }
  };

  const handleSlideEnd = () => {
    slideProgress.current = 100;

    if (!showProgressRef.current) {
      return;
    }

    setProgressBarStyles({
      ...progressBarStyles,
      width: `100%`,
    });
  };

  useEffect(() => {
    showProgressRef.current = showProgressBar;
    setProgressBarStyles({
      ...progressBarStyles,
      width: showProgressBar ? `${slideProgress.current}%` : `100%`,
    });
  }, [showProgressBar]);

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      onProgress={handleSlideProgress}
      onEnd={handleSlideEnd}
      notScene={disableAnimations ? true : false}
      stopUserAdvancement={stopUserAdvancement}
      {...props}
    >
      <div id={contentId} className="owlui-container">
        <div className={`owlui-row ${alignmentCss}`}>
          {bg && <div className="owlui-col overlay" />}

          <div className={`owlui-col text__wrapper`}>
            <div className="text__container">
              <div className="progress-indictor">
                <div className="progress-bar" style={progressBarStyles}></div>
              </div>
              <div className={`text__value can-focus ${textFocusCss}`}>
                <button id="toggle-edit-btn" onClick={toggleEditMode}>
                  Toggle Edit Mode
                </button>

                <div className="app-content">
                  {isEditMode ? (
                    <Editor data={data} setData={setData} />
                  ) : (
                    <EditorTextParser data={data} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scrowl.core.Template>
  );
};

export { InlineText as default };
