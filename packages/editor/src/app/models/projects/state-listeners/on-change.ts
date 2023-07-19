import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { ListenerAPI } from '../../../services/state';
import {
  setMeta,
  addOutlineItem,
  setOutlineItem,
  moveOutlineItem,
  duplicateOutlineItem,
  removeOutlineItem,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  addResourceItem,
  setResourceItem,
  removeResourceItem,
} from '../projects-state';
import { save } from '../projects-api';

const onChangeActions = [
  setMeta,
  addOutlineItem,
  setOutlineItem,
  moveOutlineItem,
  duplicateOutlineItem,
  removeOutlineItem,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  addResourceItem,
  setResourceItem,
  removeResourceItem,
];

const onChange = createListenerMiddleware();

let onChangeTimeout;

const onChangeEffect = (action, api: ListenerAPI) => {

  if (onChangeTimeout) {
    clearTimeout(onChangeTimeout);
  }

  onChangeTimeout = setTimeout(() => {
    const projectData = api.getState().projects.data;

    save(projectData).then((res) => {
      if (res.error) {
        console.error(res);
        return;
      }

      console.debug('listener::project-change - saved', res);
    })
  }, 250);
};

onChange.startListening({
  matcher: isAnyOf(...onChangeActions),
  effect: onChangeEffect,
});

export const onChangeMiddleware = onChange.middleware;

export default onChangeMiddleware;