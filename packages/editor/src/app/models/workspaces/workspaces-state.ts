import { createSlice } from '@reduxjs/toolkit';
import { updateObj } from '@scrowl/utils';

export const initialState = {
  id: '',
  userId: '',
  createdAt: '',
  deletedAt: '',
  openedAt: '',
  updatedAt: '',
  versions: [],
  publishing: [],
};

export const slice = createSlice({
  name: 'projectWorkspaces',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state, action.payload);
    },
    resetState: (state) => {
      updateObj(state, initialState);
    },
  }
});

export const {
  setData,
  resetState,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  slice,
  reducer,
  ...slice.actions,
};