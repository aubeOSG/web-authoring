import type { ListenerEffectAPI } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../../../services/state';

export type ListenerAPI = ListenerEffectAPI<RootState, AppDispatch>;