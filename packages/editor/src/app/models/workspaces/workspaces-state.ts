import { createSlice } from '@reduxjs/toolkit';
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
  isUncommitted: false,
};

export const slice = createSlice({
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
  }
});

export const { setData, resetState, resetIsUncommitted } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  slice,
  reducer,
  ...slice.actions,
};