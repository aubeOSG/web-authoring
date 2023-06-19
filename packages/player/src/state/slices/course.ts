import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { updateObj } from '@scrowl/utils';

export const initialState = {
  hasStarted: true,
  currentLessonId: '',
  currentLessonIndex: -1,
};

export const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<typeof initialState>) => {
      updateObj(state, action.payload);
    },
    reset: (state) => {
      updateObj(state, initialState);
    },
    toggleStarted: (state, action: PayloadAction<boolean | undefined>) => {
      state.hasStarted = action.payload ? action.payload : !state.hasStarted;
    },
    updateCurrentLesson: (state, action: PayloadAction<{ id: string; index: number }>) => {
      state.currentLessonId = action.payload.id;
      state.currentLessonIndex = action.payload.index;
    },
  },
});
export const reducer = slice.reducer;

export const {
  set,
  reset,
  toggleStarted,
  updateCurrentLesson,
} = slice.actions;

export default {
  initialState,
  slice,
  reducer,
  set,
  reset,
  toggleStarted,
  updateCurrentLesson,
};