import { createSlice } from '@reduxjs/toolkit';
import { stateManager } from '../../../services'
import { updateObj } from '../../../../utils';
import { Projects } from '../../../models';

export const initialState = {
  isOpenGlossaryEditor: false,
  isOpenAssetBrowser: false,
  isOpenEditModule: false,
  isOpenPromptProjectName: false,
  promptProjectNamePostEvent: '',
  isOpenPublishProgress: false,
  contentFocus: null,
  newLesson: false,
  newModule: false,
  activeLesson: {},
};

const triggerNewContent = (state, action) => {
  switch (action.payload.type) {
    case 'lesson':
      state.newLesson = true;
      break;
    case 'module':
      state.newLesson = true;
      state.newModule = true;
      break;
  }
};

export const config: stateManager.StateConfig = {
  name: 'workspace',
  initialState,
  reducers: {
    setData: (state, action) => {
      updateObj(state, action.payload);
    },
    resetData: (state) => {
      updateObj(state, initialState);
    },
    setContentFocus: (state, action) => {
      state.contentFocus = action.payload;
    },
    resetContentFocus: (state) => {
      state.contentFocus = null;
    },
    openEditModule: (state) => {
      state.isOpenEditModule = true;
    },
    closeEditModule: (state) => {
      state.isOpenEditModule = false;
    },
    resetNewContent: (state) => {
      state.newLesson = false;
      state.newModule = false;
    },
    openPromptProjectName: (state, action) => {
      const { postEvent } = action.payload;

      state.isOpenPromptProjectName = true;

      if (postEvent) {
        state.promptProjectNamePostEvent = postEvent;
      }
    },
    closePromptProjectName: (state) => {
      state.isOpenPromptProjectName = false;
    },
    resetPromptProjectNamePostEvent: (state) => {
      state.promptProjectNamePostEvent = '';
    },
    openPublishProgress: (state) => {
      state.isOpenPublishProgress = true;
    },
    closePublishProgress: (state) => {
      state.isOpenPublishProgress = false;
    },
    setActiveLesson: (state, action) => {
      state.activeLesson = action.payload;
    },
    resetActiveLesson: (state, action) => {
      state.activeLesson = {};
    },
  },
  extraReducers: {
    [Projects.state.addOutlineItem.type]: triggerNewContent,
    [Projects.state.duplicateOutlineItem.type]: triggerNewContent,
  },
};

export const slice = createSlice(config);

export const {
  setData,
  resetData,
  setContentFocus,
  resetContentFocus,
  openEditModule,
  closeEditModule,
  resetNewContent,
  openPromptProjectName,
  closePromptProjectName,
  resetPromptProjectNamePostEvent,
  openPublishProgress,
  closePublishProgress,
  setActiveLesson,
  resetActiveLesson,
} = slice.actions;

export const reducer = slice.reducer;

export default {
  initialState,
  config,
  slice,
  reducer,
};