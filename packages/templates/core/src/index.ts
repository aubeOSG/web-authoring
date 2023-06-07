import anime from 'animejs';
import scroll from 'scrollmagic';
import * as template from './template';
import * as markdown from './markdown';
import * as components from './components';
import { Host } from './host';

export * from './core.types';
export * from './template/template.types';
export * from './host/host.types';

const host = new Host();

export const core = {
  ...template,
  ...markdown,
  components,
  host,
  anime,
  scroll,
};

export default {
  core,
};
