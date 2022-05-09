import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export interface SettingsState {
  darkMode: boolean,
  color: string,
  colorHex: string,
  backgrounds: { id: number | string, bg: string }[],
}

const getDarkModePreference = () => {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return true;
};

const getImages = () => Array(4).fill(0).map(
  (_, index) => {
    const src = `${process.env.PUBLIC_URL}/images/background${index + 1}.jpg`;
    return { id: index + 1, bg: src };
  },
);

const initialState: SettingsState = {
  darkMode: getDarkModePreference(),
  colorHex: '#C30052',
  color: '',
  backgrounds: getImages(),
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
    addBackground: (state, action: PayloadAction<string>) => {
      const bgs = [...state.backgrounds];
      const index = bgs.findIndex((bg) => bg.id === 'custom');
      if (index > -1) bgs.splice(index, 1);
      state.backgrounds = [
        { id: 'custom', bg: action.payload },
        ...bgs,
      ];
    },
    setActiveBackground: (state, action: PayloadAction<number | string>) => {
      const bgs = [...state.backgrounds];
      const index = bgs.findIndex(({ id }) => id === action.payload);
      if (index < 0) return;
      state.backgrounds = [
        ...bgs.splice(index, 1),
        ...bgs,
      ];
    },
  },
});

export const {
  setDarkMode, setColor, addBackground, setActiveBackground,
} = settingsSlice.actions;

export const selectDarkMode = (state: RootState) => state.settings.darkMode;
export const selectColor = (state: RootState) => state.settings.color;
export const selectColorHex = (state: RootState) => state.settings.colorHex;
export const selectAllBackgrounds = (state: RootState) => state.settings.backgrounds;
export const selectActiveBackground = (state: RootState) => state.settings.backgrounds[0].bg;

export default settingsSlice.reducer;
