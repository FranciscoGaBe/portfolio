import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { RootState } from '../app/store';
import apps from '../utils/apps';

export interface IApplication {
  id: number,
  name: string,
  icon: IconDefinition,
  url: string,
  githubUrl?: string,
  open: boolean,
  shortDesc: string
}

interface AppsState {
  items: Record<string, IApplication>,
  open: IApplication[],
  active: number
}

const initialState: AppsState = {
  items: apps,
  open: [],
  active: -1,
};

export const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    openApp: (state, action: PayloadAction<number>) => {
      const app = state.items[action.payload];
      app.open = true;
      if (state.open.find(({ id }) => id === app.id)) return;
      state.open = [
        ...state.open,
        app,
      ];
    },
    closeApp: (state, action: PayloadAction<number>) => {
      const app = state.items[action.payload];
      app.open = false;
      const myApps = state.open;
      const index = myApps.findIndex(({ id }) => id === app.id);
      if (index < 0) return;
      myApps.splice(index, 1);
      state.open = [
        ...myApps,
      ];
    },
    showApp: (state, action: PayloadAction<number>) => {
      state.active = action.payload;
    },
    hideApp: (state, action: PayloadAction<number>) => {
      if (action.payload !== state.active) return;
      state.active = -1;
    },
  },
});

export const {
  openApp, closeApp, showApp, hideApp,
} = appSlice.actions;

export const selectAppsIds = (state: RootState) => Object.keys(state.apps.items);
export const selectActive = (state: RootState) => state.apps.active;
export const selectApp = (id: number) => (state: RootState) => state.apps.items[id];
export const selectOpenApps = (state: RootState) => state.apps.open;

export default appSlice.reducer;
