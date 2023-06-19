import React from 'react';
import { createRoot } from 'react-dom/client';
import { ui } from '@scrowl/ui';
import { core } from '@scrowl/template-core';
import './_index.scss';
import { player } from '../src';
import { create } from './project';

window['Scrowl'] = {
  core: core,
  ui: ui,
};

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const App = () => {
  const project = create();
  // @ts-ignore
  return <player.Root project={project} />;
};

root.render(<App />);
