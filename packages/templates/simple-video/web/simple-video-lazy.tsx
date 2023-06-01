import React, { Suspense, lazy } from 'react';

const SimpleVideoLazy = lazy(() => import('../src/simple-video'));

const SimpleVideo = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SimpleVideoLazy {...props} />
    </Suspense>
  );
};

export default SimpleVideo;
