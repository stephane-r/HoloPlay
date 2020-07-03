import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { FlashMessage } from '../../types/FlashMessage';

export interface AppState {
  instance: null | string;
  token: null | string;
  logoutMode: boolean;
  flashMessage: FlashMessage;
  darkMode: boolean;
}

const appState: AppState = {
  instance: null,
  token: null,
  logoutMode: false,
  flashMessage: {
    message: null,
    visible: false
  },
  darkMode: false
};

const appActions = {
  appInit: async (store: Store): Promise<Store> => {
    const [
      darkMode,
      searchHistory,
      instance,
      token,
      playlists,
      favorisPlaylist,
      logoutMode
    ] = await Promise.all([
      AsyncStorage.getItem('darkMode'),
      AsyncStorage.getItem('searchHistory'),
      AsyncStorage.getItem('instance'),
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('playlists'),
      AsyncStorage.getItem('favorisPlaylist'),
      AsyncStorage.getItem('logoutMode')
    ]);

    return {
      ...store,
      instance,
      token,
      darkMode: JSON.parse(darkMode) ?? appState.darkMode,
      history: JSON.parse(searchHistory) ?? [],
      playlists: JSON.parse(playlists) ?? [],
      favorisPlaylist: JSON.parse(favorisPlaylist) ?? null,
      logoutMode: JSON.parse(logoutMode) ?? appState.logoutMode
    };
  },
  setToken: (store: Store, actions: any, token: string) => {
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('logoutMode', JSON.stringify(false));

    return {
      ...store,
      token,
      logoutMode: false
    };
  },
  setLogoutMode: (store: Store, actions: any, logoutMode: boolean) => {
    AsyncStorage.setItem('logoutMode', JSON.stringify(logoutMode));

    return {
      ...store,
      logoutMode
    };
  },
  setFlashMessage: (store: Store, actions: any, message: any): Store => {
    return {
      ...store,
      flashMessage: {
        message,
        visible: true
      }
    };
  },
  hideFlashMessage: (store: Store): Store => {
    return {
      ...store,
      flashMessage: {
        ...store.flashMessage,
        visible: false
      }
    };
  },
  setDarkMode: async (
    store: Store,
    actions: any,
    darkMode: boolean
  ): Promise<Store> => {
    try {
      await AsyncStorage.setItem('darkMode', String(darkMode));
    } catch (error) {
      return actions.setFlashMessage(error);
    }

    return {
      ...store,
      darkMode
    };
  }
};

export { appState, appActions };
