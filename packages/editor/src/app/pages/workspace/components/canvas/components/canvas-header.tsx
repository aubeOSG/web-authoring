import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ui } from '@scrowl/ui';
import * as css from '../_canvas.scss';
import { Settings } from '../../../../../models';
import { menu } from '../../../../../services';

export const CanvasHeader = () => {
  const isDirty = useRef(false);
  const prevName = useRef(name);
  const nameRef = useRef<HTMLSpanElement>(null);
  const [nameWidth, setNameWidth] = useState(0);
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const animationOpts = {
    initial: !isAnimated ? {} : { opacity: 0 },
    animate: !isAnimated ? {} : { opacity: 1 },
    transition: !isAnimated ? {} : { delay: animationDelay + 0.1 },
  };
  const slideMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Duplicate Slide',
      click: () => {
        console.log('duplicate slide');
      },
    },
    { type: 'separator' },
    {
      label: 'Delete Slide',
      click: () => {
        console.log('remove Slide');
      },
    },
  ];
  const inputStyles = {
    width: nameWidth,
  };

  const handleNameInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Enter':
        ev.currentTarget.blur();
        break;
      case 'Escape':
        isDirty.current = false;
        ev.currentTarget.blur();
        break;
    }
  };

  const handleNameUpdate = (ev: React.FocusEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    if (isDirty.current) {
      isDirty.current = false;
    }
  };

  const handelOpenSlideMenu = (ev: React.MouseEvent) => {
    const target = ev.target as HTMLElement;

    menu.API.contextMenu(ev, slideMenu).then((result) => {
      target.blur();
    });
  };

  useEffect(() => {
    if (!nameRef.current) {
      return;
    }

    let newWidth = nameRef.current.offsetWidth;
    //FIXME::slide-removal
    // if (slideId === -1) {
    //   newWidth = 150;
    // } else if (nameWidth === newWidth) {
    //   return;
    // } else {
    //   newWidth += 32;
    // }

    setNameWidth(newWidth);
  }, [nameRef]);

  return (
    <motion.div
      className={css.canvasHeader}
      initial={animationOpts.initial}
      animate={animationOpts.animate}
      transition={animationOpts.transition}
    >
      <h1 className="visually-hidden"></h1>
      <ui.Icon
        icon="rectangle"
        display="outlined"
        opsz={20}
        appearance="Slide"
        pxScale="H3"
      />
      <div className={css.canvasHeaderSlideName}>
        <span ref={nameRef}></span>
        <input
          name="slideName"
          id="slideNameInput"
          style={inputStyles}
          className="owlui-form-control"
          placeholder="Untitled Slide"
          onKeyDown={handleNameInput}
          onBlur={handleNameUpdate}
        />
      </div>
      <ui.Button
        className={css.actionMenu}
        variant="ghost"
        onClick={handelOpenSlideMenu}
        onContextMenu={handelOpenSlideMenu}
      >
        <ui.Icon
          display="rounded"
          icon="more_vert"
          opsz={20}
          filled
          pxScale="H4"
        />
      </ui.Button>
    </motion.div>
  );
};

export default {
  CanvasHeader,
};
