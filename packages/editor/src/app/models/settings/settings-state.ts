import { createSlice } from '@reduxjs/toolkit';
import { updateObj, hasProp } from '@scrowl/utils';

export enum ASPECT_RATIO {
  Fit = "FIT",
  Wide_16_9 = "16:9",
};

export const initialState = {
  hasWelcomed: false,
  hasPublished: false,
  lastUsedAt: '',
  lastPublishedAt: '',
  theme: 'light',
  aspect: ASPECT_RATIO.Fit,
  reducedAnimations: true,
  animationDelay: 0,
  previewMode: 'lesson',
};

export const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setState: (state, action) => {
      updateObj(state, action.payload);

      if (action.payload.lastUsedAt) {
        state.hasWelcomed = true;
      }

      if (action.payload.lastPublishedAt) {
        state.hasPublished = true;
      }
    },
    setLastUsedAt: (state, action) => {
      state.lastUsedAt = action.payload;
      state.hasWelcomed = true;
    },
    setLastPublishedAt: (state, action) => {
      state.lastPublishedAt = action.payload;
      state.hasPublished = true;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setAspect: (state, action) => {
      state.aspect = action.payload;
    },
    setAnimation: (state, action) => {
      if (hasProp(action.payload, 'reducedAnimations')) {
        state.reducedAnimations = action.payload.reducedAnimations;
      }

      if (hasProp(action.payload, 'animationDelay')) {
        state.animationDelay = action.payload.animationDelay;
      }
    },
    setPreviewMode: (state, action) => {
      state.previewMode = action.payload;
    },
  },
});

export const {
  setState,
  setTheme,
  setAspect,
  setAnimation,
  setLastUsedAt,
  setLastPublishedAt,
  setPreviewMode,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  slice,
  reducer,
  ...slice.actions,
};
