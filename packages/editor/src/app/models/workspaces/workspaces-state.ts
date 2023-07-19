import { createSlice } from '@reduxjs/toolkit';
import { updateObj } from '@scrowl/utils';

export const initialState = {
  data: {
    id: '',
    createdAt: '',
    userId: '',
    paneWidth: 320,
    activeTab: 'tab-outline',
    deletedAt: '',
    openedAt: '',
    updatedAt: '',
    versions: [],
    publishing: [],
  },
  isUncommitted: false,
};

export const slice = createSlice({
  name: 'projectWorkspaces',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state.data, action.payload);
    },
    resetIsUncommitted: (state) => {
      state.isUncommitted = false;
    },
    resetState: (state) => {
      updateObj(state, initialState);
    },
    update: (state, action) => {
      updateObj(state.data, action.payload);
    },
  }
});

export const { setData, resetState, resetIsUncommitted, update } = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  slice,
  reducer,
  ...slice.actions,
};