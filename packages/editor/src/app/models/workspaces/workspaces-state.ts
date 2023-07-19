import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { updateObj } from '@scrowl/utils';

export const initialState = {
  id: '',
  userId: '',
  paneWidth: 320,
  activeTab: 'tab-outline',
  createdAt: '',
  deletedAt: '',
  openedAt: '',
  updatedAt: '',
  versions: [],
  publishing: [],
  activeLesson: {},
};

export const config: stateManager.StateConfig = {
  name: 'projectWorkspaces',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state, action.payload);
    },
    resetIsUncommitted: (state) => {
      state.isUncommitted = false;
    },
    resetState: (state) => {
      updateObj(state, initialState);
    },
  },
};

export const slice = createSlice(config);

export const { setData, resetState, resetIsUncommitted } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};