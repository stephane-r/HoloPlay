import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { FlashMessage } from '../../types/FlashMessage';
import { Video } from '../../types';

export interface AppState {
  username: null | string;
  instance: string;
  token: null | string;
  logoutMode: boolean;
  flashMessage: FlashMessage;
  darkMode: boolean;
  sendErrorMonitoring: boolean;
  language: 'en' | 'fr';
  dialogAddVideoToPlaylist: {
    isOpen: boolean;
    video: null | Video;
  };
}

const appState: AppState = {
  username: 'User',
  instance: null,
  token: null,
  logoutMode: false,
  flashMessage: {
    message: null,
    visible: false,
    action: {
      label: 'Close',
      onPress: (): null => null
    }
  },
  darkMode: false,
  sendErrorMonitoring: false,
  language: 'en',
  dialogAddVideoToPlaylist: {
    isOpen: false,
    video: null
  }
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
      username,
      sendErrorMonitoring,
      language,
      lastPlays
    ] = await Promise.all([
      AsyncStorage.getItem('darkMode'),
      AsyncStorage.getItem('searchHistory'),
      AsyncStorage.getItem('instance'),
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('playlists'),
      AsyncStorage.getItem('favorisPlaylist'),
      AsyncStorage.getItem('logoutMode'),
      AsyncStorage.getItem('username'),
      AsyncStorage.getItem('sendErrorMonitoring'),
      AsyncStorage.getItem('language'),
      AsyncStorage.getItem('lastPlays')
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
      logoutMode: JSON.parse(logoutMode) ?? appState.logoutMode,
      sendErrorMonitoring:
        JSON.parse(sendErrorMonitoring) ?? appState.sendErrorMonitoring,
      language: language ?? appState.language,
      lastPlays: JSON.parse(lastPlays) ?? []
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
  setSendErrorMonitoring: (store: Store, actions: any, value: boolean) => {
    AsyncStorage.setItem('sendErrorMonitoring', String(value));

    return {
      ...store,
      sendErrorMonitoring: value
    };
  },
  setFlashMessage: (store: Store, actions: any, flashMessage: any): Store => {
    if (flashMessage.action) {
      setTimeout((): void => actions.setDefaultFlashMessageAction(), 7000);
    }

    return {
      ...store,
      flashMessage: {
        ...store.flashMessage,
        ...flashMessage,
        visible: true
      }
    };
  },
  hideFlashMessage: (store: Store): Store => ({
    ...store,
    flashMessage: {
      ...store.flashMessage,
      visible: false
    }
  }),
  setDefaultFlashMessageAction: (store: Store): Store => ({
    ...store,
    flashMessage: {
      ...store.flashMessage,
      action: appState.flashMessage.action
    }
  }),
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
  },
  setLanguage: async (
    store: Store,
    actions: any,
    language: 'en' | 'fr'
  ): Promise<Store> => {
    await AsyncStorage.setItem('language', language);

    return {
      ...store,
      language
    };
  },
  toggleDialogAddVideoToPlaylist: (store: Store) => ({
    ...store,
    dialogAddVideoToPlaylist: {
      ...store.dialogAddVideoToPlaylist,
      isOpen: !store.dialogAddVideoToPlaylist.isOpen
    }
  }),
  setVideoDialogAddVideoToPlaylist: (
    store: Store,
    actions: any,
    video: Video
  ) => ({
    ...store,
    dialogAddVideoToPlaylist: {
      ...store.dialogAddVideoToPlaylist,
      video,
      isOpen: true
    }
  })
};

export { appState, appActions };
