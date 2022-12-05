import { MenuItemConstructorOptions, MenuItem, Menu } from 'electron';
import { MenuItemApiPreview, PreviewTypes } from '../menu.types';
import { rq, log } from '../..';
import { get as getSettings, set as setSetting } from '../../../models/settings';

export const API: MenuItemApiPreview = {
  open: {
    name: '/preview/open',
    type: 'send',
  },
};

const menuId = 'preview-menu';

export const create = (isMac: boolean) => {
  const template: MenuItemConstructorOptions = {
    id: menuId,
    label: "Preview",
    submenu: [
      {
        id: `${menuId}-open`,
        label: 'Preview...',
        accelerator: 'CmdorCtrl+Shift+P',
        click: (menuItem) => {
          let selectedItem: MenuItem | undefined = undefined;

          for (var i = 0,  ii = menuItem.menu.items.length; i < ii; i++) {
            if (menuItem.menu.items[i].type === 'radio' && menuItem.menu.items[i].checked) {
              selectedItem = menuItem.menu.items[i];
              break;
            }
          }

          if (!selectedItem) {
            return;
          }

          rq.send(API.open.name, selectedItem.id.replace(`${menuId}-`, ''));
        },
      },
      { type: "separator" },
      {
        id: `${menuId}-slide`,
        type: 'radio',
        label: "Current Slide",
        checked: true,
        enabled: false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'slide';

          rq.send(API.open.name, type);
          setSetting(ev, 'previewMode', type).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
      {
        id: `${menuId}-lesson`,
        type: 'radio',
        label: "Current Lesson",
        checked: false,
        enabled: false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'lesson';

          rq.send(API.open.name, type);
          setSetting(ev, 'previewMode', type).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
      {
        id: `${menuId}-module`,
        type: 'radio',
        label: "Current Module",
        checked: false,
        enabled: false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'module';

          rq.send(API.open.name, type);
          setSetting(ev, 'previewMode', type).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
      {
        id: `${menuId}-project`,
        type: 'radio',
        label: "Entire Project",
        checked: false,
        enabled: false,
        click: (menuItem, browserWindow, ev) => {
          const type: PreviewTypes = 'project';

          rq.send(API.open.name, type);
          setSetting(ev, 'previewMode', type).then((res) => {
            if (res.error) {
              log.error(res);
            }
          });
        },
      },
    ],
  };

  return template;
};

export const register = () => {
  rq.registerEndpointAll(API);
};

export const loadSettings = () => {
  return new Promise<rq.ApiResult>((resolve) => {
    const internalEvent: rq.RequestEvent = {};

    getSettings(internalEvent, 'previewMode', 'slide').then(resolve);
  });
};

export const asyncInit = (menu: Menu) => {
  return new Promise<rq.ApiResult>((resolve) => {
    loadSettings().then((settingsRes) => {
      if (settingsRes.error) {
        log.error(settingsRes);
        resolve(settingsRes);
        return;
      }

      const previewMode = settingsRes.data.setting;
      const menuItem = menu.getMenuItemById(menuId);

      if (!menuItem || !menuItem.submenu) {
        resolve({
          error: true,
          message: 'Unable to find preview menu',
        });
        return;
      }

      const items = menuItem.submenu.items;
      let selectedItem: MenuItem | undefined = undefined;
      let currentItem: MenuItem | undefined = undefined;
      
      for (var i = 0,  ii = items.length; i < ii; i++) {
        if (items[i].type === 'radio') {
          if (items[i].checked) {
            currentItem = items[i];
          }

          if (items[i].id.replace(`${menuId}-`, '') === previewMode) {
            selectedItem = items[i];
          }
        }

        if (currentItem && selectedItem) {
          break;
        }
      }

      if (!currentItem || !selectedItem) {
        const itemsNotFound = {
          error: true,
          message: 'Unable to find preview mode items',
          data: {
            previewMode,
          },
        };
        log.error(itemsNotFound);
        resolve(itemsNotFound);
        return;
      }

      if (currentItem.id === selectedItem.id) {
        resolve({
          error: false,
          data: {
            previewMode,
          },
        });
        return;
      }

      currentItem.checked = false;
      selectedItem.checked = true;

      resolve({
        error: false,
        data: {
          previewMode,
        },
      });
    });
  });
};

export default {
  register,
  create,
};