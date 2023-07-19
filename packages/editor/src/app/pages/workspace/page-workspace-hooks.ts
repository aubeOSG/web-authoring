import { useSelector, useDispatch } from 'react-redux';
import type { StateProcessor, RootState } from '../../services/state';
import { hasProp } from '@scrowl/utils';
import { state } from './';

const processor: StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const useWorkspace = (prop?: string) => {
  return useSelector((data: RootState) => {
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

  processor.dispatch(state.Workspace.setData(data));
};

export const resetWorkspace = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.resetData());
};

export const useContentFocus = () => {
  return useSelector((data: RootState) => {
    return data.workspace.contentFocus;
  });
};

export const setContentFocus = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.setContentFocus(data));
};

export const resetContentFocus = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.resetContentFocus());
};

export const useModuleEditor = () => {
  return useSelector((data: RootState) => {
    return data.workspace.isOpenEditModule;
  });
};

export const openModuleEditor = (module) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  const moduleEditorEvent = new CustomEvent('moduleEditor', {
    detail: {
      module: module,
    },
  });
  document.dispatchEvent(moduleEditorEvent);

  processor.dispatch(state.Workspace.openEditModule());
};

export const closeModuleEditor = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.closeEditModule());
};

export const useNewContent = () => {
  return useSelector((data: RootState) => {
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

  processor.dispatch(state.Workspace.resetNewContent());
};

export const usePromptProjectName = () => {
  return useSelector((data: RootState) => {
    return data.workspace.isOpenPromptProjectName;
  });
};

export const openPromptProjectName = (postEvent?: unknown) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.openPromptProjectName({ postEvent }));
};

export const closePromptProjectName = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.closePromptProjectName());
};

export const usePromptProjectNamePostEvent = () => {
  return useSelector((data: RootState) => {
    return data.workspace.promptProjectNamePostEvent;
  });
};

export const resetPromptProjectNamePostEvent = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.resetPromptProjectNamePostEvent());
};

export const usePublishProgress = () => {
  return useSelector((data: RootState) => {
    return data.workspace.isOpenPublishProgress;
  });
};

export const openPublishProgress = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.openPublishProgress());
};

export const closePublishProgress = () => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.closePublishProgress());
};

export const useActiveLesson = () => {
  return useSelector((data: RootState) => {
    return data.workspace.activeLesson;
  });
};

export const setActiveLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.Workspace.setActiveLesson(data));
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
  useActiveLesson,
  setActiveLesson,
};
