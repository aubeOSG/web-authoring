import React from 'react';
import type { ContentRendererProps } from './types';

export const ContentRenderer = ({ children }: ContentRendererProps) => {
  // take in a lesson and slides
  //

  return <div>{children}</div>;
};

export default ContentRenderer;
