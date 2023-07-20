import { useSelector, useDispatch } from 'react-redux';
import type { ApiResult } from '../../services/requester';
import type { StateProcessor, RootState } from '../../services/state';
import { API, state } from '.';

const processor: StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const resetState = () => {
  if (!processor.dispatch) {
    console.warn('workspaces processor not ready');
    return;
  }

  processor.dispatch(state.resetState());
};

export const useData = ()  => {
  return useSelector((root: RootState) => root.projectWorkspaces.data);
};

export const setData = (data) => {
  if (!processor.dispatch) {
    console.warn('workspaces processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const update = (data) => {
  if (!processor.dispatch) {
    console.warn('workspaces processor not ready');
    return;
  }

  processor.dispatch(state.update(data));
};

export const create = (userId: string): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.create(userId).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const save = (req): Promise<ApiResult> => {
  return new Promise((resolve) => {
    console.log('req::: ', req);
    API.save(req).then((res) => {
      console.log('workspace hook save: ', res);
      if (processor.dispatch) {
        processor.dispatch(state.resetIsUncommitted());
      }

      if (res.error) {
        console.error(res);
      } else {
        setData(res.data);
      }

      resolve(res);
    });
  });
};

export const get = (workspaceId: string): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.get(workspaceId).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const useSettings = () => {
  return useSelector((root: RootState) => root.projectWorkspaces.data.settings);
};

export const setSettings = (data) => {
  if (!processor.dispatch) {
    console.warn('workspaces processor not ready');
    return;
  }

  processor.dispatch(state.setSettings(data));
};

export default {
  useProcessor,
  resetState,
  useData,
  setData,
  update,
  create,
  save,
  get,
  useSettings,
  setSettings,
};