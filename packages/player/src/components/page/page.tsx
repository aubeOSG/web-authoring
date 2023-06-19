import React from 'react';
import { PageProps } from './page.types';
import { BoundaryError } from '../';

export const Page = ({
  lesson,
  passingThreshold,
  controller,
  ...props
}: PageProps) => {
  return (
    <BoundaryError>
      <div>Page</div>
    </BoundaryError>
  );
};

export default Page;
