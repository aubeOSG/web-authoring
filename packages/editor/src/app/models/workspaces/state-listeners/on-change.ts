import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { ListenerAPI } from '../../../services/state';
import {
  update,
  setSettings,
} from '../workspaces-state';
import { save } from '../workspaces-api';

const onChangeActions = [
  update,
  setSettings,
];

const onChange = createListenerMiddleware();

let onChangeTimeout;

const onChangeEffect = (action, api: ListenerAPI) => {

  if (onChangeTimeout) {
    clearTimeout(onChangeTimeout);
  }

  onChangeTimeout = setTimeout(() => {
    const data = api.getState().projectWorkspaces.data;

    save(data).then((res) => {
      if (res.error) {
        console.error(res);
        return;
      }

      console.debug('listener::workspace-change - saved', res);
    });
  }, 250);
};

onChange.startListening({
  matcher: isAnyOf(...onChangeActions),
  effect: onChangeEffect,
});

export const onChangeMiddleware = onChange.middleware;

export default onChangeMiddleware;