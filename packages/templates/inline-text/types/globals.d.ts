import { CORE_PROPS } from '@scrowl/template-core';
import { UI_PROPS } from '@scrowl/ui';
import { InlineTextProps, InlineTextSchemaProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: CORE_PROPS;
      ui: UI_PROPS;
    };
    InlineText: (props: InlineTextProps) => JSX.Element;
    InlineTextSchema: InlineTextSchemaProps;
  }
}
