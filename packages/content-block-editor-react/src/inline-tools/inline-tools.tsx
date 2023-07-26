import createGenericInlineTool from 'editorjs-inline-tool';

export const SmallInlineTool = createGenericInlineTool({
  sanitize: {
    small: {},
  },
  shortcut: 'CMD+G',
  tagName: 'SMALL',
  toolboxIcon:
    // icon editor-js uses
    "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='m40-200 220-560h80l220 560h-75l-57-150H172l-57 150H40Zm156-214h208L302-685h-4L196-414Zm414-36v-60h310v60H610Z'/></svg>",
});

export const LargeInlineTool = createGenericInlineTool({
  sanitize: {
    big: {},
  },
  shortcut: 'CMD+O',
  tagName: 'BIG',
  toolboxIcon:
    // icon editor-js uses
    "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='m40-200 220-560h80l220 560h-75l-57-150H172l-57 150H40Zm156-214h208L302-685h-4L196-414Zm534 94v-130H600v-60h130v-130h60v130h130v60H790v130h-60Z'/></svg>",
});
