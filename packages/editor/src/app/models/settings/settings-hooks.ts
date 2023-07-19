import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../services/state';
import type { StateProcessor, RootState } from '../../services/state';
import type { PreviewTypes } from '../../services/menu';
import { API, state } from './';

const processor: StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const useState = () => {
  return useAppSelector((data: RootState) => data.settings);
};

export const setState = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setState(data));
};

export const useTheme = () => {
  return useAppSelector((data: RootState) => data.settings.theme);
};

export const setTheme = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setTheme(data));
};

export const useAspect = () => {
  return useAppSelector((data: RootState) => data.settings.aspect);
};

export const setAspect = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setAspect(data));
};

export const useAnimation = () => {
  return useAppSelector((data: RootState) => {
    return {
      reducedAnimations: data.settings.reducedAnimations,
      animationDelay: data.settings.animationDelay,
    };
  });
};

export const setAnimation = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setAnimation(data));
};

export const useHasWelcomed = () => {
  return useAppSelector((data: RootState) => {
    return data.settings.hasWelcomed;
  });
};

export const useHasPublished = () => {
  return useAppSelector(
    (data: RootState) => data.settings.hasPublished
  );
};

export const setLastPublishedAt = (data) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }

  processor.dispatch(state.setLastPublishedAt(data));
};

export const usePreviewMode = () => {
  return useAppSelector((data: RootState) => {
    return data.settings.previewMode;
  });
};

export const setPreviewMode = (type: PreviewTypes) => {
  if (!processor.dispatch) {
    console.warn('settings processor not ready');
    return;
  }
  //FIXME::electron-web-bug
  processor.dispatch(state.setPreviewMode(type));
  API.set('previewMode', type).then((res) => {
    if (res.error) {
      console.error(res);
    }
  });
};

export const save = () => {
  const data = useAppSelector((data: RootState) => data.settings);

  return new Promise((resolve) => {
    API.save(data).then(resolve);
  });
};

export default {
  useProcessor,
  useState,
  setState,
  useTheme,
  setTheme,
  useAspect,
  setAspect,
  useAnimation,
  setAnimation,
  useHasWelcomed,
  useHasPublished,
  setLastPublishedAt,
  usePreviewMode,
  setPreviewMode,
  save,
};
