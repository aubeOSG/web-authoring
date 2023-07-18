import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { configureStore, addListener, } from '@reduxjs/toolkit';
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit';
import { StoreConfig } from './state.types';
import * as models from '../../models';
import pages from '../../pages';

const modelNames = Object.keys(models);

const pageNames = Object.keys(pages);
let middleware = [];
const config: StoreConfig = {
  reducer: {},
};

const addGlobalState = (entity) => {
  let state = entity.state ? entity.state : (entity.reducer && entity.slice ? entity : null);

  if (!state) {
    console.warn('failed to add state', entity);
    return;
  } else if (!state.reducer || !state.slice || !state.slice.name) {
    const subStates = Object.keys(state);

    addGlobalStates(subStates, state);
    return;
  }
  
  config.reducer[state.slice.name] = state.reducer;
  
  if (entity.middleware) {
    middleware = middleware.concat(entity.middleware);
  }
};

const addGlobalStates = (states, stateMap) => {
  states.forEach((name) => {
    addGlobalState(stateMap[name]);
  });
};

addGlobalStates(modelNames, models);
addGlobalStates(pageNames, pages);

if (middleware.length) {
  config.middleware = (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(middleware);
  };
}

export const store = configureStore(config);
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;
export default store;
