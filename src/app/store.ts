import { configureStore } from '@reduxjs/toolkit';
import appsReducer from '../slices/appsSlice';
import settingsReducer from '../slices/settingsSlice';
import settingsLoader from '../utils/settingsLoader';

export const store = configureStore({
  reducer: {
    apps: appsReducer,
    settings: settingsReducer,
  },
});

settingsLoader(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
