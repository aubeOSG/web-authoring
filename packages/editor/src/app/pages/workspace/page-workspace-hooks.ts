import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { hasProp } from '../../../utils';
import { state } from './';

const processor: stateManager.StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const useWorkspace = (prop?: string) => {
  return useSelector((data: stateManager.RootState) => {
    if (!prop) {
      return data.workspace;
    }

    if (hasProp(data.workspace, prop)) {
      return data.workspace[prop];
    } else {
      console.warn('workspace data does not have prop', prop, data.workspace);
      return;
    }
  });
};

export const setWorkspace = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.workspace.setData(data));
};

export const resetWorkspace = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.resetData as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useContentFocus = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.contentFocus;
  });
};

export const setContentFocus = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.workspace.setContentFocus(data));
};

export const resetContentFocus = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.resetContentFocus as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useModuleEditor = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.isOpenEditModule;
  });
};

export const openModuleEditor = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.openEditModule as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const closeModuleEditor = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.closeEditModule as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useNewContent = () => {
  return useSelector((data: stateManager.RootState) => {
    return {
      newLesson: data.workspace.newLesson,
      newModule: data.workspace.newModule,
    };
  });
};

export const resetNewContent = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.resetNewContent as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const usePromptProjectName = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.isOpenPromptProjectName;
  });
};

export const openPromptProjectName = (postEvent?: unknown) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.workspace.openPromptProjectName({ postEvent }));
};

export const closePromptProjectName = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace
    .closePromptProjectName as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const usePromptProjectNamePostEvent = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.promptProjectNamePostEvent;
  });
};

export const resetPromptProjectNamePostEvent = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace
    .resetPromptProjectNamePostEvent as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const usePublishProgress = () => {
  return useSelector((data: stateManager.RootState) => {
    return data.workspace.isOpenPublishProgress;
  });
};

export const openPublishProgress = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace.openPublishProgress as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const closePublishProgress = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const fn = state.workspace
    .closePublishProgress as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export default {
  useProcessor,
  useWorkspace,
  setWorkspace,
  resetWorkspace,
  useContentFocus,
  setContentFocus,
  resetContentFocus,
  useModuleEditor,
  openModuleEditor,
  closeModuleEditor,
  useNewContent,
  resetNewContent,
  usePromptProjectName,
  openPromptProjectName,
  closePromptProjectName,
  usePromptProjectNamePostEvent,
  resetPromptProjectNamePostEvent,
  usePublishProgress,
  openPublishProgress,
  closePublishProgress,
};
