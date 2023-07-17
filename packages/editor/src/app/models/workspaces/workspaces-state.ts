import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { updateObj } from '@scrowl/utils';

export const initialState = {
  id: '',
  userId: '',
  paneWidth: 320,
  createdAt: '',
  deletedAt: '',
  openedAt: '',
  updatedAt: '',
  versions: [],
  publishing: [],
};

export const config: stateManager.StateConfig = {
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
};

export const slice = createSlice(config);

export const {
  setData,
  resetState,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};