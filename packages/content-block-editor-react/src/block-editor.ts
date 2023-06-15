import EditorJS from "@scrowl/content-block-editor";
import Checklist from "@editorjs/checklist";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import NestedList from "@editorjs/nested-list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import { BlockEditorClass, BlockEditorOutputData, BlockEditorConfig } from './component.types';

export class BlockEditor implements BlockEditorClass {
  private _editor: EditorJS;

  constructor({ tools, ...config }: BlockEditorConfig) {
    const extendTools: BlockEditorConfig['tools'] = {
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
  }

  public getInstance() {
    return this._editor;
  }

  public async clear() {
    await this._editor.clear();
  }

  public async save () {
    return this._editor.save();
  }

  public async render (data: BlockEditorOutputData) {
    await this._editor.blocks.render(data);
  }

  public async destroy () {
    await this._editor.isReady;
    await this._editor.destroy();
  }
};

export default BlockEditor;