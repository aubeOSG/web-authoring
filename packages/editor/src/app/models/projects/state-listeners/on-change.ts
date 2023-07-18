import { createListenerMiddleware } from '@reduxjs/toolkit';
import { ListenerAPI } from './state-listeners.types';
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

    console.log('projectData', projectData);
  }, 250);
};

const createListener = (action) => {
  onChange.startListening({
    actionCreator: action,
    effect: onChangeEffect,
  });
};

onChangeActions.forEach(createListener);

export const onChangeMiddleware = onChange.middleware;

export default onChangeMiddleware;