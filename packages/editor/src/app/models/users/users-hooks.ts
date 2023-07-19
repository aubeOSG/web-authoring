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
    console.warn('users processor not ready');
    return;
  }

  processor.dispatch(state.resetState());
};

export const useData = ()  => {
  return useSelector((data: RootState) => data.users.data);
};

export const setData = (data) => {
  if (!processor.dispatch) {
    console.warn('users processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const update = (data) => {
  if (!processor.dispatch) {
    console.warn('users processor not ready');
    return;
  }

  processor.dispatch(state.update(data));
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
    API.save(req).then((res) => {
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

export const useSettings = ()  => {
  return useSelector((data: RootState) => data.users.settings);
};

export const useHasPublished = ()  => {
  return useSelector((data: RootState) => data.users.settings.hasPublished);
};

export const setHasPublished = (hasPublished: boolean) => {
  if (!processor.dispatch) {
    console.warn('users processor not ready');
    return;
  }

  processor.dispatch(state.setHasPublished(hasPublished));
};

export const useAnimations = ()  => {
  return useSelector((data: RootState) => {
    const reducedAnimations = data.users.settings.reducedAnimations;
    const animationDelay = data.users.animationDelay;

    return {
      reducedAnimations,
      animationDelay,
    };
  });
};

export const setAnimations = (data: { reducedAnimations?: boolean, animationDelay?: number })  => {
  if (!processor.dispatch) {
    console.warn('users processor not ready');
    return;
  }

  processor.dispatch(state.setAnimation(data));
};

export default {
  useProcessor,
  resetState,
  useData,
  setData,
  update,
  create,
  get,
  save,
  useSettings,
  useHasPublished,
  setHasPublished,
  useAnimations,
  setAnimations,
};