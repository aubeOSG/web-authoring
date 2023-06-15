import EditorJS from "@scrowl/content-block-editor";
import Paragraph from '@editorjs/paragraph';
import CustomBlockOne from '@scrowl/custom-block-one';
import {
  BlockEditorClass,
  BlockEditorOutputData,
  BlockEditorConfig,
} from './component.types';

export class BlockEditor implements BlockEditorClass {
  private _editor: EditorJS;

  constructor({ tools, ...config }: BlockEditorConfig) {
    const extendTools = {
      customBlockOne: {
        class: CustomBlockOne.CustomBlockOneFactory,
        inlineToolbar: true,
      },
      customBlockReact: {
        class: CustomBlockOne.ReactFactory,
        inlineToolbar: true,
      },
      ...tools,
    };

    console.log('Custom Paragraph: ', CustomBlockOne);
    console.log(
      'Custom Paragraph factory: ',
      CustomBlockOne.CustomBlockOneFactory
    );

    console.log('Paragraph ', Paragraph);

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
    await this._editor.render(data);
  }

  public async destroy() {
    await this._editor.isReady;
    await this._editor.destroy();
  }
};

export default BlockEditor;