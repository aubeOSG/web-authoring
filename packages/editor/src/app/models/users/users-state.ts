import { createSlice } from '@reduxjs/toolkit';
import { updateObj } from '@scrowl/utils';

export const initialState = {
  data: {
    id: '',
    createdAt: '',
    deletedAt: '',
    name: '',
    avatar: '',
    hasPublished: false,
  },
  isUncommitted: false,
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
  },
});

export const { setData, resetState, resetIsUncommitted, update, } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  slice,
  reducer,
  ...slice.actions,
};