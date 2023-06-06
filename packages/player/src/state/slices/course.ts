import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StateConfig } from '../store.types';

const initialState = {
  hasStarted: false,
};

const config: StateConfig = {
  name: 'course',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<typeof initialState>) => {
      
    },
  },
};