import {
  ProjectModule,
  ProjectLesson,
} from '../../root';

export interface PageDefinition {
  module: ProjectModule,
  lesson: ProjectLesson,
  url: string;
  Element: () => JSX.Element;
};