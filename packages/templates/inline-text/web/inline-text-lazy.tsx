import React, { Suspense, lazy } from 'react';

const InlineTextLazy = lazy(() => import('../src/inline-text'));

const InlineText = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InlineTextLazy {...props} />
    </Suspense>
  );
};

export default InlineText;
