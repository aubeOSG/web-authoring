import { createSlice } from '@reduxjs/toolkit';
import { updateObj } from '@scrowl/utils';

export const initialState = {
  id: '',
  createdAt: '',
  deletedAt: '',
  name: '',
  avatar: '',
  hasPublished: false,
  isUncommitted: false,
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state, action.payload);
    },
    resetState: (state) => {
      updateObj(state, initialState);
    },
    resetIsUncommitted: (state) => {
      state.isUncommitted = false;
    },
  },
});

export const { setData, resetState, resetIsUncommitted, } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  slice,
  reducer,
  ...slice.actions,
};