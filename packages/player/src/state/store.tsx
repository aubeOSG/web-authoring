import React, { createContext } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  Provider,
} from 'react-redux';
import type {
  StoreConfig,
  SliceConfig,
  StateProviderProps,
  DispatchProviderProps,
} from './store.types';
import slices from './slices';

const sliceNames = Object.keys(slices);
const config: StoreConfig = {
  reducer: {},
};

const addSlice = (name: string) => {
  const sliceConfig: SliceConfig = slices[name];

  if (!sliceConfig.reducer || !sliceConfig.slice) {
    console.error(
      `Unable to add slice config (${name}) to store: requires both a reducer and a slice`
    );
    return;
  }

  config.reducer[sliceConfig.slice.name] = sliceConfig.reducer;
};

sliceNames.forEach(addSlice);
const store = configureStore(config);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = createContext<AppDispatch | null>(
  null
) as React.Context<AppDispatch>;

const DispatchProvider = ({ children }: DispatchProviderProps) => {
  const dispatch = useDispatch();

  return (
    <useAppDispatch.Provider value={dispatch}>
      {children}
    </useAppDispatch.Provider>
  );
};

export const StateProvider = ({ children }: StateProviderProps) => {
  return (
    <Provider store={store}>
      <DispatchProvider>{children}</DispatchProvider>
    </Provider>
  );
};

export default {
  useAppSelector,
  useAppDispatch,
  StateProvider,
};
