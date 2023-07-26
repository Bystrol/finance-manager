import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import balanceReducer from '../features/balance/balanceSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
