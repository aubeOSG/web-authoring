import React, { useCallback } from 'react';
import { PageEndButtonProps } from './page.types';

export const EndButton = ({
  isEnd,
  isLast,
  onNext,
  onEnd,
  onClick,
  ...props
}: PageEndButtonProps) => {
  const Scrowl = window['Scrowl'];
  const label = isEnd
    ? 'Finish Course'
    : isLast
    ? 'Next Module'
    : 'Next Lesson';
  const variant = isEnd ? 'primary' : 'link';

  const handleClick = useCallback(
    (e) => {
      if (isEnd) {
        onEnd();
      } else {
        onNext();
      }

      if (onClick) {
        onClick(e);
      }
    },
    [isEnd, isLast, onNext, onEnd]
  );

  return (
    <Scrowl.ui.Button {...props} onClick={handleClick} variant={variant}>
      {label}
    </Scrowl.ui.Button>
  );
};

export default EndButton;
