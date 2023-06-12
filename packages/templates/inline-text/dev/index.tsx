import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { core } from '@scrowl/template-core';
import { ui } from '@scrowl/ui';
import './_index.scss';
import { InlineTextSchema, InlineTextSchemaProps } from '../src';
const InlineText = React.lazy(() => import('../src/inline-text'));

const container = document.getElementById('scrowl-player') as HTMLElement;
const root = createRoot(container);
const Scrowl = {
  core,
  ui,
};
window['Scrowl'] = Scrowl;

const App = () => {
  const controller = new Scrowl.core.scroll.Controller();
  const schema = InlineTextSchema as InlineTextSchemaProps;

  return (
    <div id="lesson-wrapper">
      <div className="lesson">
        <Suspense fallback={<div>Loading...</div>}>
          <InlineText
            editMode={true}
            id="template-inline-text"
            controller={controller}
            schema={schema}
          />
        </Suspense>
      </div>
    </div>
  );
};

root.render(<App />);
