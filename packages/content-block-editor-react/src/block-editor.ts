import EditorJS from "@scrowl/content-block-editor";
import { BlockEditorClass, BlockEditorOutputData, BlockEditorConfig } from './component.types';

export class BlockEditor implements BlockEditorClass {
  private _editor: EditorJS;

  constructor({ tools, ...config }: BlockEditorConfig) {
    const extendTools = {
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
    await this._editor.render(data);
  }

  public async destroy () {
    await this._editor.isReady;
    await this._editor.destroy();
  }
};

export default BlockEditor;