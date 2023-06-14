import React from 'react';
import { OutputData, EditorConfig } from '@scrowl/content-block-editor';

export type BlockEditorOutputData = OutputData;
export type BlockEditorConfig = EditorConfig;

export interface BlockEditorClass {
  destroy: () => Promise<void>;
  clear: () => Promise<void>;
  save: () => Promise<OutputData>;
  render: (data: OutputData) => Promise<void>;
  getInstance: () => any | null;
};

export type BlockEditorFactory = (config: EditorConfig) => BlockEditorClass;

export interface BlockEditorCommons extends Omit<EditorConfig, 'data'> {
  factory: BlockEditorFactory;
  holder?: string;
  value?: EditorConfig['data'];
  defaultValue?: EditorConfig['data'];
  onInit?: (editor: BlockEditorClass) => void;
  children: React.ReactElement;
};

export type BlockEditorProps = Omit<BlockEditorCommons, 'factory'>;