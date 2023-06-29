import React from 'react';
import { BlockEditor } from '@scrowl/content-block-editor-react';
import { PageProps } from './page.types';
import { BoundaryError } from '../';

export const Page = ({ lesson }: PageProps) => {
  return (
    <BoundaryError>
      <BlockEditor
        id={lesson.id.toString()}
        defaultValue={lesson.content}
        readOnly={false}
      />
    </BoundaryError>
  );
};

export default Page;
