import createGenericInlineTool from 'editorjs-inline-tool';

export const MarkInlineTool = createGenericInlineTool({
  sanitize: {
    mark: {},
  },
  shortcut: 'CMD+K',
  tagName: 'MARK',
  toolboxIcon:
    // icon editor-js uses
    "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='M80 0v-121h800V0H80Zm501-474L466-589 284-407l115 115 182-182Zm-72-158 115 115 186-186-115-115-186 186Zm-64-21 200 200-194 194q-19 19-52.5 19T346-259l-11-11-43 43H137l120-120-4-4q-22-22-21.5-55.5T254-462l191-191Zm0 0 210-210q17-17 43-17t43 17l112 112q17 17 16.5 45.5T852-660L645-453 445-653Z'/></svg>",
});

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
    small: {},
  },
  shortcut: 'CMD+O',
  tagName: 'BIG',
  toolboxIcon:
    // icon editor-js uses
    "<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='m40-200 220-560h80l220 560h-75l-57-150H172l-57 150H40Zm156-214h208L302-685h-4L196-414Zm534 94v-130H600v-60h130v-130h60v130h130v60H790v130h-60Z'/></svg>",
});
