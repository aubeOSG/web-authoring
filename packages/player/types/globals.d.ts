import { player } from '../src';
import { RUNTIME_SERVICE } from '../../runtime/src/runtime.types';
import type {
  CORE_PROPS,
  TemplateEventEnter,
  TemplateEventStart,
  TemplateEventProgress,
  TemplateEventEnd,
  TemplateEventLeave
} from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';

export interface CustomEventMap {
  "updateOutro": CustomEvent;
  "nextSlide": CustomEvent;
  "quizCompleted": CustomEvent;
  "startCourse": CustomEvent;
  "resetQuiz": CustomEvent;
  "CurrentSlideNavUpdate": CustomEvent;
  "CurrentSlidePageUpdate": CustomEvent;
  "slide.enter": CustomEvent<TemplateEventEnter>;
  "slide.start": CustomEvent<TemplateEventStart>;
  "slide.progress": CustomEvent<TemplateEventProgress>;
  "slide.end": CustomEvent<TemplateEventEnd>;
  "slide.leave": CustomEvent<TemplateEventLeave>;
};

declare global {
  interface Window {
    Scrowl: {
      runtime?: RUNTIME_SERVICE;
      player: typeof player;
      core: CORE_PROPS;
      ui: UI_PROPS;
    };
  };

  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
  };
};
