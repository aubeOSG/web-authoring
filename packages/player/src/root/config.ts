import {
  ProjectLesson,
  ProjectModule,
  PlayerRootConfig,
  ProjectConfig,
} from './root.types';

export const create = (
  lessons: Array<ProjectLesson>,
  modules: Array<ProjectModule>,
  resources,
  glossary,
  name,
  subtitle
) => {
  const rootConfig: Array<PlayerRootConfig> = [];

  while (modules.length > 0) {
    const module = modules.shift();

    if (!module) {
      break;
    }

    const config: PlayerRootConfig = {
      module: module,
      lessons: [],
    };
    const lCnt = lessons.length;
    let l = 0;

    while (lessons.length > 0 && l < lCnt) {
      l++;

      if (lessons[0].moduleId !== module.id) {
        continue;
      }

      const lesson = lessons.shift();

      if (!lesson) {
        break;
      }

      config.lessons.push({
        lesson,
      });
    }

    rootConfig.push(config);
  }

  const projectConfig: ProjectConfig = {
    name: name,
    subtitle: subtitle,
    outlineConfig: rootConfig,
    resources: resources,
    glossary: glossary,
  };

  return projectConfig;
};

export default {
  create,
};
