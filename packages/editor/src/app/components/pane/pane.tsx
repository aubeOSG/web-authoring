import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as css from './_pane.scss';
import { PaneProps } from './pane.types';
import { Workspaces } from '../../models';

export const Pane = ({ className, children, ...props }: PaneProps) => {
  let classes = className
    ? `${className} ${css.pane} support-high-contrast `
    : `${css.pane} support-high-contrast `;
  let grabClasses = `${css.grabHandle} `;
  const grabNode = useRef<HTMLDivElement>(null);
  const side = props.side ? props.side : 'left';
  const workspaceSettings = Workspaces.useSettings();
  const [paneWidth, setPaneWidth] = useState(workspaceSettings.paneWidth);

  useEffect(() => {
    const grabElem = grabNode.current;
    let winResizeTimer: ReturnType<typeof setTimeout>;

    if (!grabElem) {
      return;
    }

    const rootElem = document.getElementById('app');

    if (!rootElem) {
      return;
    }

    const resizePane = (width: number) => {
      const minWidth = 220;
      const maxWidth = Math.round(window.innerWidth / 3);
      let newWidth = width;

      if (width > maxWidth) {
        newWidth = maxWidth;
      }

      if (width < minWidth) {
        newWidth = minWidth;
      }

      rootElem.style.setProperty(`--pane-${side}-width`, newWidth + 'px');
      Workspaces.setSettings({ paneWidth: newWidth });
      return newWidth;
    };

    const handleGrabMove = (ev: MouseEvent) => {
      ev.preventDefault();
      const newWidth =
        side === 'right' ? window.innerWidth - ev.clientX : ev.clientX;

      setPaneWidth(resizePane(newWidth));
    };

    const handleGrabEnd = (ev: MouseEvent) => {
      ev.preventDefault();
      document.documentElement.style.setProperty(
        '--dragging-pointer-events',
        ''
      );
      document.removeEventListener('mousemove', handleGrabMove);
      document.removeEventListener('mouseup', handleGrabEnd);
    };

    const handleGrabStart = (ev: MouseEvent) => {
      ev.preventDefault();
      document.documentElement.style.setProperty(
        '--dragging-pointer-events',
        'none'
      );

      document.addEventListener('mousemove', handleGrabMove);
      document.addEventListener('mouseup', handleGrabEnd);
    };

    const handleWindowResize = () => {
      if (winResizeTimer) {
        clearTimeout(winResizeTimer);
      }

      winResizeTimer = setTimeout(() => {
        // ensure that the max width of the pane is respected
        const newWidth = parseInt(
          rootElem.style
            .getPropertyValue(`--pane-${side}-width`)
            .replace('px', '')
        );

        if (isNaN(newWidth)) {
          return;
        }

        setPaneWidth(resizePane(newWidth));
      }, 50);
    };

    grabElem.addEventListener('mousedown', handleGrabStart);
    window.addEventListener('resize', handleWindowResize);

    setPaneWidth(resizePane(paneWidth));

    return () => {
      if (!grabElem) {
        return;
      }

      if (winResizeTimer) {
        clearTimeout(winResizeTimer);
      }

      grabElem.removeEventListener('mousedown', handleGrabStart);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [grabNode, paneWidth]);

  useEffect(() => {
    if (paneWidth !== workspaceSettings.paneWidth) {
      setPaneWidth(workspaceSettings.paneWidth);
    }
  }, [workspaceSettings.paneWidth]);

  switch (side) {
    case 'right':
      classes += `${css.paneRight} `;
      grabClasses += css.grabHandleRight;
      break;
    default:
      classes += `${css.paneLeft} `;
      grabClasses += css.grabHandleLeft;
      break;
  }

  return (
    <motion.div className={`${classes}`} {...props}>
      {children}
      <div className={grabClasses} ref={grabNode}>
        <div></div>
      </div>
    </motion.div>
  );
};

export default Pane;
