
import type { Controller } from '@scrowl/template-core';
import {
  ProjectData,
  ProjectConfig,
} from '../../root';

export interface PageCommons {
  project: ProjectData;
  config: ProjectConfig;
  passingThreshold?: number;
  controller?: Controller;
};

export type PageProps = PageCommons & React.HTMLAttributes<HTMLDivElement>;

export interface PageEndButtonCommons {
  isLast: boolean;
  isEnd: boolean;
  onNext: () => void;
  onEnd: () => void;
};

export type PageEndButtonProps = PageEndButtonCommons & React.HTMLAttributes<HTMLButtonElement>;