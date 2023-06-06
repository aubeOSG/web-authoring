import React from 'react';
import type { ContentRendererProps } from './types';

export const ContentRenderer = ({ children }: ContentRendererProps) => {
  return <div>{children}</div>;
};

export default ContentRenderer;
