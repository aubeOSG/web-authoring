import { useDispatch, useSelector } from 'react-redux';
import { PayloadAction, Reducer, ConfigureStoreOptions } from '@reduxjs/toolkit';

export type { Store } from '@reduxjs/toolkit';

export type StateValueObject = {
  [key: string]: any | StateValueObject | StateValueArray;
};

export type StateValueArray = Array<any | StateValueObject | StateValueArray>;

export type StateValue = any | StateValueObject | StateValueArray;

export type StateConfig = {
  name: string;
  initialState: StateValue;
  reducers: {
    [key: string]: (state: any, action: PayloadAction<StateValue>) => void;
  };
  extraReducers?: {
    [key: string]: (state: any, action: PayloadAction<StateValue>) => void;
  }
};

export type SliceConfig = {
  slice: StateConfig;
  reducer: Reducer;
};

export type StoreConfig = ConfigureStoreOptions;

export type StateSelector = any | ReturnType<typeof useSelector>;

export type Dispatch = any | ReturnType<typeof useDispatch>;

export type StateProcessor = {
  data?: any;
  dispatch?: Dispatch;
  isProcessing?: boolean;
  navigator?: {
    (to: string, options?: { replace?: boolean; state?: any }): void;
    (delta: number): void;
  };
};

export type StateProviderProps = React.AllHTMLAttributes<HTMLDivElement>;
export type DispatchProviderProps = React.AllHTMLAttributes<HTMLDivElement>;