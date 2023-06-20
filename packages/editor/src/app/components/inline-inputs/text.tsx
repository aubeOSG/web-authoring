import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as css from './_inline-inputs.scss';
import { InlineInputTextProps } from './inline-inputs.types';
import { Elem } from '@scrowl/utils';

export const Text = ({
  isEdit,
  text,
  onChange,
  onBlur,
  onKeyDown,
  containerProps,
  ...props
}: InlineInputTextProps) => {
  const isDirty = useRef(false);
  const prevText = useRef(text);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  let classes = `${css.inlineInput}`;
  let placeholder = 'Untitled...';

  if (isEdit) {
    classes += ` active`;
  }

  if (props.className) {
    classes += ` ${props.className}`;
  }

  if (props.placeholder) {
    placeholder = props.placeholder;
  }

  const handleChange = (ev: React.FormEvent<HTMLTextAreaElement>) => {
    const val = ev.currentTarget.value;

    ev.currentTarget.style.height = '1px';
    ev.currentTarget.style.height = `${4 + ev.currentTarget.scrollHeight}px`;
    onChange(val);
    isDirty.current = true;
  };

  const handleControls = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    switch (ev.code) {
      case 'Enter':
        ev.currentTarget.blur();
        break;
      case 'Escape':
        onChange(prevText.current);
        isDirty.current = false;
        ev.currentTarget.blur();
        break;
      case 'Space':
        Elem.stopEvent(ev);
        ev.currentTarget.value += ' ';
        break;
    }

    if (onKeyDown) {
      onKeyDown(ev);
    }
  };

  const handleBlur = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    const val = ev.currentTarget.value;

    prevText.current = val;

    if (isDirty.current) {
      onChange(val);
      isDirty.current = false;
    }

    if (onBlur) {
      onBlur(ev);
    }
  };

  useEffect(() => {
    if (!isDirty.current) {
      prevText.current = text;
    }

    return () => {};
  }, [text, isDirty]);

  useLayoutEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.style.height = '1px';
      inputRef.current.style.height = `${2 + inputRef.current.scrollHeight}px`;
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEdit, inputRef]);

  return (
    <div className={classes} {...containerProps}>
      <div className={css.inlineInputDisplay}>{text}</div>
      <textarea
        ref={inputRef}
        className={css.inlineInputControl}
        value={text}
        placeholder={placeholder}
        tabIndex={isEdit ? -1 : 1}
        onKeyDown={handleControls}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};

export default Text;
