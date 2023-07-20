import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { ListenerAPI } from '../../../services/state';
import {
  update,
  setHasPublished,
  setAnimation,
  setTheme,
} from '../users-state';
import { save } from '../users-api';

const onChangeActions = [
  update,
  setHasPublished,
  setAnimation,
  setTheme,
];

const onChange = createListenerMiddleware();

let onChangeTimeout;

const onChangeEffect = (action, api: ListenerAPI) => {

  if (onChangeTimeout) {
    clearTimeout(onChangeTimeout);
  }

  onChangeTimeout = setTimeout(() => {
    const data = api.getState().users.data;

    save(data).then((res) => {
      if (res.error) {
        console.error(res);
        return;
      }

      console.debug('listener::user-change - saved', res);
    });
  }, 250);
};

onChange.startListening({
  matcher: isAnyOf(...onChangeActions),
  effect: onChangeEffect,
});

export const onChangeMiddleware = onChange.middleware;

export default onChangeMiddleware;