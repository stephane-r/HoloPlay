import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { FlashMessage } from '../../types/FlashMessage';

export interface AppState {
  username: null | string;
  instance: string;
  token: null | string;
  logoutMode: boolean;
  flashMessage: FlashMessage;
  darkMode: boolean;
}

const appState: AppState = {
  username: 'User',
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
      logoutMode,
      username
    ] = await Promise.all([
      AsyncStorage.getItem('darkMode'),
      AsyncStorage.getItem('searchHistory'),
      AsyncStorage.getItem('instance'),
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('playlists'),
      AsyncStorage.getItem('favorisPlaylist'),
      AsyncStorage.getItem('logoutMode'),
      AsyncStorage.getItem('username')
    ]);

    return {
      ...store,
      instance,
      token,
      username,
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
  setInstance: async (store: Store, actions: any, instance) => {
    await AsyncStorage.setItem('instance', instance);

    return {
      ...store,
      instance
    };
  },
  setLogoutMode: (store: Store, actions: any, logoutMode: boolean) => {
    AsyncStorage.setItem('logoutMode', JSON.stringify(logoutMode));

    return {
      ...store,
      logoutMode
    };
  },
  setUsername: (store: Store, actions: any, username: string) => {
    AsyncStorage.setItem('username', username);

    return {
      ...store,
      username
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
