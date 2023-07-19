import { createSlice } from '@reduxjs/toolkit';
import { updateObj, hasProp } from '@scrowl/utils';

export const initialState = {
  data: {
    id: '',
    createdAt: '',
    deletedAt: '',
    name: '',
    avatar: '',
    settings: {
      hasPublished: false,
      reducedAnimations: true,
      theme: 'light',
    },
  },
  isUncommitted: false,
  animationDelay: 0,
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state.data, action.payload);
    },
    update: (state, action) => {
      updateObj(state.data, action.payload);
    },
    resetState: (state) => {
      updateObj(state, initialState);
    },
    resetIsUncommitted: (state) => {
      state.isUncommitted = false;
    },
    setHasPublished: (state, action) => {
      state.data.settings.hasPublished = action.payload;
    },
    setTheme: (state, action) => {
      state.data.settings.theme = action.payload;
    },
    setAnimation: (state, action) => {
      if (hasProp(action.payload, 'reducedAnimations')) {
        state.data.settings.reducedAnimations = action.payload.reducedAnimations;
      }

      if (hasProp(action.payload, 'animationDelay')) {
        state.animationDelay = action.payload.animationDelay;
      }
    },
  },
});

export const {
  setData,
  resetState,
  resetIsUncommitted,
  update,
  setHasPublished,
  setTheme,
  setAnimation,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  slice,
  reducer,
  ...slice.actions,
};