import '@scrowl/ui/src/theme/_index.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { stateManager } from './services';
import { Root } from './root';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const store = stateManager.store;

root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
