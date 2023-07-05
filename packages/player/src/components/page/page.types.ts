
import type { Controller } from '@scrowl/template-core';
import {
  ProjectData,
} from '../../root';

export interface PageCommons {
  project: ProjectData;
  passingThreshold?: number;
  controller?: Controller;
};

export type PageProps = PageCommons & React.HTMLAttributes<HTMLDivElement>;