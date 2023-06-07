import { player } from '../src';
import { RUNTIME_SERVICE } from '../../runtime/src/runtime.types';
import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';

interface CustomEventMap {
  "updateOutro": CustomEvent;
  "nextSlide": CustomEvent;
  "quizCompleted": CustomEvent;
  "startCourse": CustomEvent;
  "resetQuiz": CustomEvent;
  "CurrentSlideNavUpdate": CustomEvent;
  "slider.enter": CustomEvent;
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
