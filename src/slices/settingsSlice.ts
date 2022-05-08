import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface SettingsState {
  darkMode: boolean
}

const initialState: SettingsState = {
  darkMode: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {

  },
});

export const { } = settingsSlice.actions;

export const selectAppsIds = (state: RootState) => Object.keys(state.apps.items);

export default settingsSlice.reducer;
