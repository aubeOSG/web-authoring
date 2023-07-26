import EditorJS from "@scrowl/content-block-editor";
import Checklist from "@editorjs/checklist";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import NestedList from "@editorjs/nested-list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Image from "@editorjs/image";
import { IntroductionFactory } from '@scrowl/content-block-introduction';
import { ColumnFactory } from '@scrowl/content-block-columns';
import { MultipleChoiceFactory } from '@scrowl/content-block-multiple-choice';
import { TimelineFactory } from '@scrowl/content-block-timeline';
import {
  SmallInlineTool,
  LargeInlineTool,
  MarkerTool,
  UnderlineInlineTool,
  Strikethrough,
  LinkTool,
} from './inline-tools';

import {
  BlockEditorClass,
  BlockEditorOutputData,
  BlockEditorConfig,
} from './component.types';

export class BlockEditorAPI implements BlockEditorClass {
  public _editor: EditorJS;

  constructor({ tools, ...config }: BlockEditorConfig) {
    const extendTools: BlockEditorConfig['tools'] = {
      columns: {
        class: ColumnFactory,
        inlineToolbar: true,
      },
      multipleChoice: {
        class: MultipleChoiceFactory,
        inlineToolbar: true,
      },
      introduction: {
        class: IntroductionFactory,
        inlineToolbar: true,
      },
      timeline: {
        class: TimelineFactory,
        inlineToolbar: true,
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      header: {
        class: Header,
        inlineToolbar: true,
      },
      link: {
        class: Link,
        inlineToolbar: true,
        config: {
          endpoint: '/api/editor/preview-link',
        },
      },
      nestedList: {
        class: NestedList,
        inlineToolbar: true,
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
      },
      table: {
        class: Table,
        inlineToolbar: false,
      },
      image: {
        class: Image,
        config: {
          endpoints: {
            byFile: '/api/editor/image-upload',
            byUrl: '/api/editor/image-fetch',
          },
        },
      },
      underline: {
        class: UnderlineInlineTool,
        shortcut: 'CMD+SHIFT+U',
      },
      small: SmallInlineTool,
      large: LargeInlineTool,
      marker: {
        class: MarkerTool,
        shortcut: 'CMD+SHIFT+M',
      },
      strikethrough: {
        class: Strikethrough,
        shortcut: 'CMD+SHIFT+X',
      },
      linkTool: {
        class: LinkTool,
      },
      ...tools,
    };

    this._editor = new EditorJS({
      tools: extendTools,
      ...config,
    });
  }

  public getInstance() {
    return this._editor;
  }

  public async clear() {
    await this._editor.clear();
  }

  public async save() {
    return this._editor.saver.save();
  }

  public async render(data: BlockEditorOutputData) {
    await this._editor.blocks.render(data);
  }

  public async destroy() {
    await this._editor.isReady;
    await this._editor.destroy();
  }

  public focus() {
    const blockCount = this._editor.blocks.getBlocksCount();
    const lastBlock = this._editor.blocks.getBlockByIndex(blockCount - 1);

    if (!lastBlock?.isEmpty) {
      this._editor.blocks.insert(
        'paragraph',
        undefined,
        undefined,
        blockCount,
        true
      );
    }

    this._editor.caret.setToLastBlock('end');
  }
};

export default BlockEditorAPI;