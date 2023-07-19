import {
  ContextMenuItem,
  PreviewTypes,
  ContextMenuPayload
} from './menu.types';
import { rq } from '../../services';
import { Elem, ELEM_ALIGNMENT } from '@scrowl/utils';
import { ContextMenu } from '../../components';

const ENDPOINTS_PUBLISH = {
  publish: '/publish',
  publishQuick: '/publish/quick',
};

export const contextMenu = (
  ev: React.MouseEvent,
  items: Array<ContextMenuItem>,
  payload?: {
    [key: string]: any;
  },
  options?: {
    alignment?: ELEM_ALIGNMENT,
    offset?: [number, number],
  }
) => {
  Elem.stopEvent(ev);

  const target = ev.target as HTMLElement;
  const position = !options || !options.alignment ? [ev.clientX, ev.clientY] : Elem.getPosition(target, options);

  return new Promise<rq.ApiResult>((resolve) => {
    const menuItemMap = {};
    const menuItems = items.map((item, idx) => {
      const { click, ...data } = item;
      const id = item.id || idx.toString();

      menuItemMap[id] = click;
      data.id = id;
      return data;
    });
    const contextMenuPayload = { menuItems, position, payload } as unknown as rq.JSON_DATA;
    const menuConfig = contextMenuPayload as unknown as ContextMenuPayload;

    ContextMenu.create(target, menuConfig).then((componentResult) => {
      if (componentResult.error) {
        console.error(componentResult);
        resolve(componentResult);
        return;
      }

      if (componentResult.data.canceled) {
        resolve(componentResult);
        return;
      }

      if (!componentResult.data.item) {
        console.warn('context menu did not return a selected item and was not canceled');
        resolve(componentResult);
        return;
      }

      const id = componentResult.data.item.id;

      menuItemMap[id](componentResult.data.item);
      resolve(componentResult);
    });
  });
};

export default {
  contextMenu,
};
