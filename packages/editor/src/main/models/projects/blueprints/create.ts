import { ProjectData } from '../../../../app/models/projects/projects.types';

export const project = (): ProjectData => {
  return {
    meta: {
      name: 'Untitled Project',
      filename: '',
      tags: [],
    },
    scorm: {
      name: '',
      description: '',
      authors: '',
      organization: '',
      reportStatus: 'Passed/Incomplete',
      identifier: '',
      outputFormat: '2004 3rd Edition',
      optimizeMedia: 'recommended',
    },
    modules: [],
    lessons: [],
    glossary: [],
    resources: [],
  };
};

export default {
  project,
};
