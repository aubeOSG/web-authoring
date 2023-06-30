import { project as createProject } from './create';

export const make = () => {
  const project = createProject();

  project.modules = [];
  project.lessons = [];

  project.modules.push({
    id: 0,
    name: 'Introduction',
    passingThreshold: 75,
  });
  project.lessons.push({
    moduleId: 0,
    id: 0,
    name: 'Introduction',
    content: {
      blocks: [],
      time: new Date().valueOf(),
      version: '2.27.0',
    },
  });

  return project;
};

export default {
  make,
};