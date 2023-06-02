import { ProjectData } from '../../../../app/models/projects/projects.types';
import { TemplateNames, get as getTemplate } from './templates';

export const slide = <T>(
  name: string,
  mId: number,
  lId: number,
  id: number,
  template: TemplateNames,
) => {
  return {
    name,
    moduleId: mId,
    lessonId: lId,
    id: id,
    template: getTemplate<T>(template),
    notes: '',
  };
};

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
    slides: [],
    glossary: [],
    resources: [],
  };
};

export default {
  slide,
};
