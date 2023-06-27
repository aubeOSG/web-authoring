import EditorJS from "@scrowl/content-block-editor";
import Checklist from "@editorjs/checklist";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import NestedList from "@editorjs/nested-list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import CustomBlockOne from '@scrowl/content-block-columns';
import CustomBlockTwo from '@scrowl/content-block-multiple-choice';
import CustomBlockThree from '@scrowl/content-block-introduction';
import TimelineComponent from '@scrowl/content-block-timeline';
import {
  BlockEditorClass,
  BlockEditorOutputData,
  BlockEditorConfig,
} from './component.types';

export class BlockEditor implements BlockEditorClass {
  private _editor: EditorJS;

  constructor({ tools, ...config }: BlockEditorConfig) {
    const extendTools: BlockEditorConfig['tools'] = {
      customBlockOne: {
        class: CustomBlockOne.ColumnFactory,
        inlineToolbar: true,
      },
      CustomBlockTwo: {
        class: CustomBlockTwo.MultipleChoiceFactory,
        inlineToolbar: true,
      },
      customBlockThree: {
        class: CustomBlockThree.IntroductionFactory,
        inlineToolbar: true,
      },
      customBlockReact: {
        class: TimelineComponent.ReactFactory,
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
      ...tools,
    };

    this._editor = new EditorJS({
      tools: extendTools,
      ...config,
    });

    console.log('constructor editor ', this._editor);
  }

  public getInstance() {
    return this._editor;
  }

  public async clear() {
    await this._editor.clear();
  }

  public async save() {
    return this._editor.save();
  }

  public async render(data: BlockEditorOutputData) {
    await this._editor.blocks.render(data);
  }

  public async destroy() {
    await this._editor.isReady;
    await this._editor.destroy();
  }
};

export default BlockEditor;