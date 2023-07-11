import { nanoid } from 'nanoid';
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
      blocks: [
        {
          'id': nanoid(10),
          'type': 'header',
          'data': {
            'text': 'A new lesson',
          },
        },
        {
          'id': nanoid(10),
          'type': 'paragraph',
          'data': {
            'text': "Let's begin with a cold open.",
          },
        },
      ],
      time: new Date().valueOf(),
      version: '2.27.0',
    },
  });

  return project;
};

export default {
  make,
};