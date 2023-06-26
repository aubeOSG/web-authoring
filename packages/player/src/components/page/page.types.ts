
import type { Controller } from '@scrowl/template-core';
import {
  ProjectLesson,
} from '../../root';

export interface PageCommons {
  lesson: ProjectLesson;
  passingThreshold: number;
  controller: Controller;
};

export type PageProps = PageCommons & React.HTMLAttributes<HTMLDivElement>;