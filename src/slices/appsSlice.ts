import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { RootState } from '../app/store';
import apps from '../utils/apps';

interface BaseApp {
  id: number | string,
  name: string,
  icon: IconDefinition,
  type: string,
  open?: boolean,
  shortDesc?: string,
  desc?: string,
  hideIcon?: boolean,
  hideTaskbar?: boolean
}

export interface ApplicationItem extends BaseApp {
  type: 'app',
  url: string,
  githubUrl?: string
}

export interface LinkItem extends BaseApp {
  type: 'link',
  hideTaskbar: true
  url: string,
}

export interface ComponentItem extends BaseApp {
  type: 'component',
  component: string
}

export interface FunctionItem extends BaseApp {
  type: 'function',
  hideTaskbar: true
  onClick: () => void,
}

export type AppItem = ApplicationItem | LinkItem | ComponentItem | FunctionItem

interface AppsState {
  items: Record<string, AppItem>,
  open: AppItem[],
  active: number | string
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
    openApp: (state, action: PayloadAction<BaseApp['id']>) => {
      const app = state.items[action.payload];
      app.open = true;
      if (state.open.find(({ id }) => id === app.id)) return;
      state.open = [
        ...state.open,
        app,
      ];
    },
    closeApp: (state, action: PayloadAction<BaseApp['id']>) => {
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
    showApp: (state, action: PayloadAction<BaseApp['id']>) => {
      state.active = action.payload;
    },
    hideApp: (state, action: PayloadAction<BaseApp['id']>) => {
      if (action.payload !== state.active) return;
      state.active = -1;
    },
    addApp: (state, action: PayloadAction<AppItem>) => {
      const newApp = action.payload;
      state.items = {
        ...state.items,
        [newApp.id]: newApp,
      };
    },
  },
});

export const {
  openApp, closeApp, showApp, hideApp, addApp,
} = appSlice.actions;

export const selectAppsIds = (state: RootState) => Object.keys(state.apps.items);
export const selectApps = (state: RootState) => Object.values(state.apps.items);
export const selectActive = (state: RootState) => state.apps.active;
export const selectApp = (id: BaseApp['id']) => (state: RootState) => state.apps.items[id];
export const selectOpenApps = (state: RootState) => state.apps.open;

export default appSlice.reducer;
