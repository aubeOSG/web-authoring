import * as create from './create';

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
    content: {
      blocks: [
        {
          'id': 'mQ-6SMxbIz',
          'type': 'header',
          'data': {
            'text': 'A new lesson',
          },
        },
        {
          'id': 'z13gJyKBtz',
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
