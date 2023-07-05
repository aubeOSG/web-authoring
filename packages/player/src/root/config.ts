import {
  PlayerRootConfig,
  ProjectConfig,
  ProjectData,
} from './root.types';

export const create = (project: ProjectData): ProjectConfig => {
  const {
    lessons,
    modules,
    resources,
    glossary,
    name,
    subtitle,
  } = project;
  const rootConfig: Array<PlayerRootConfig> = [];
  const Modules = modules ? modules.slice() : [];
  const Lessons = lessons ? lessons.slice() : [];

  while (Modules.length > 0) {
    const module = Modules.shift();

    if (!module) {
      break;
    }

    const config: PlayerRootConfig = {
      module: module,
      lessons: [],
    };

    const lCnt = Lessons.length;
    let l = 0;

    while (Lessons.length > 0 && l < lCnt) {
      l++;

      if (Lessons[0].moduleId !== module.id) {
        continue;
      }

      const lesson = Lessons.shift();

      if (!lesson) {
        break;
      }

      config.lessons.push(lesson);
    }

    rootConfig.push(config);
  }

  const projectConfig: ProjectConfig = {
    name: name || '',
    subtitle: subtitle || '',
    outlineConfig: rootConfig,
    resources: resources,
    glossary: glossary,
  };

  return projectConfig;
};

export default {
  create,
};
