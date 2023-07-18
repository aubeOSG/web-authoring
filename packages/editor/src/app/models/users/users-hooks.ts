import { useSelector, useDispatch } from 'react-redux';
import type { ApiResult } from '../../services/requester';
import type { StateProcessor, RootState } from '../../services/state';
import { API, state } from './';

const processor: StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const resetState = () => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.resetState());
};

export const useData = ()  => {
  return useSelector((data: RootState) => data.users);
};

export const setData = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const create = (): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.create().then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const save = (req): Promise<ApiResult> => {
  return new Promise((resolve) => {
    console.log('req: ', req);
    API.save(req).then((res) => {
      console.log('users hook save: ', res);
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

export const get = (id: string): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.get(id).then((res) => {

      if (res.error) {
        console.error(res);
      } else if (processor.dispatch) {
        processor.dispatch(state.setData(res.data));
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
  save,
};