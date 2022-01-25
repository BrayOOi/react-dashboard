import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import dashboardReducer from '../features/Dashboard/baseDashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
