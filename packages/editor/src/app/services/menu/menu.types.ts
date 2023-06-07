import { JSON_DATA } from '../requester';

export type ContextMenuItem = any;

export type ContextMenuPosition = [number, number];

export type PreviewTypes = 'lesson' | 'module' | 'project';

export type ContextMenuPayload = {
  menuItems: Array<ContextMenuItem>;
  position: [number, number];
  payload: JSON_DATA;
}
