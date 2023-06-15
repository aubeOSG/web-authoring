import * as create from './create';
import { TemplateSchemas } from './templates';

export const make = () => {
  const project = create.project();

  project.modules?.push({
    id: 0,
    name: 'Introduction',
    passingThreshold: 75,
  });
  project.lessons?.push({
    moduleId: 0,
    id: 0,
    name: 'Introduction',
  });

  return project;
};

export default {
  make,
};
