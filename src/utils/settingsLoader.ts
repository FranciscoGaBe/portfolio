import { store } from '../app/store';
import {
  setColor, setDarkMode, SettingsState,
} from '../slices/settingsSlice';

const subscribeToStore = (myStore: typeof store) => {
  const debounceTime = 500;
  let timeout = 0;
  let data: Partial<SettingsState> = {};

  myStore.subscribe(() => {
    const { settings } = myStore.getState();
    data = settings;

    if (timeout !== 0) return;

    timeout = window.setTimeout(() => {
      const saveData = { ...data };
      delete saveData.color;
      delete saveData.backgrounds;
      window.localStorage.setItem('settings', JSON.stringify(saveData));
      timeout = 0;
    }, debounceTime);
  });
};

const loadData = (myStore: typeof store) => {
  if (!('settings' in window.localStorage)) {
    myStore.dispatch(setColor(myStore.getState().settings.colorHex));
    return;
  }
  const settings: SettingsState = JSON.parse(window.localStorage.getItem('settings') as string);

  if ('darkMode' in settings) myStore.dispatch(setDarkMode(settings.darkMode));
  if ('colorHex' in settings) myStore.dispatch(setColor(settings.colorHex));
};

const settingsLoader = (myStore: typeof store) => {
  loadData(myStore);
  subscribeToStore(myStore);
};

export default settingsLoader;
