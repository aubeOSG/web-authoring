import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../services';
import { updateObj } from '../../../utils';

export const initialState = {
  id: '',
  createdAt: '',
  deletedAt: '',
  name: '',
  avatar: '',
};

export const config: stateManager.StateConfig = {
  name: 'users',
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