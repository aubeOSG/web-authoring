import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { stateManager, rq } from '../../services';
import { API, state } from '.';

const processor: stateManager.StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const resetState = () => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  const fn = state.resetState as ActionCreatorWithoutPayload;
  processor.dispatch(fn());
};

export const useData = ()  => {
  return useSelector((data: stateManager.RootState) => data.projectWorkspaces);
};

export const setData = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const create = (userId: string): Promise<rq.ApiResult> => {
  return new Promise((resolve) => {
    API.create(userId).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const get = (workspaceId: string): Promise<rq.ApiResult> => {
  return new Promise((resolve) => {
    API.get(workspaceId).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export default {
  useProcessor,
  resetState,
  useData,
  setData,
  create,
  get,
};