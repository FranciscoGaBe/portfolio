import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export interface SettingsState {
  darkMode: boolean,
  color: string,
  colorHex: string
}

const getDarkModePreference = () => {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return true;
};

const initialState: SettingsState = {
  darkMode: getDarkModePreference(),
  colorHex: '#C30052',
  color: '',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      const color = action.payload.match(/[a-fA-F0-9]{1,2}/g)?.map(
        (match) => parseInt(match, 16).toString().padStart(3, '0'),
      );
      if (!color || color.length !== 3) return;
      state.color = color.join(' ');
      state.colorHex = action.payload;
    },
  },
});

export const { setDarkMode, setColor } = settingsSlice.actions;

export const selectDarkMode = (state: RootState) => state.settings.darkMode;
export const selectColor = (state: RootState) => state.settings.color;
export const selectColorHex = (state: RootState) => state.settings.colorHex;

export default settingsSlice.reducer;
