import React from 'react';
import { LoaderProps } from './loader.types';

export const Loader = ({ children }: LoaderProps) => {
  return (
    <div>
      <div>Loading...</div>
      {children ? <div>{children}</div> : <></>}
    </div>
  );
};

export default Loader;
