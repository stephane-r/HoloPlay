import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { FlashMessage } from '../../types/FlashMessage';
import { CustomInstance, Video } from '../../types';

export interface AppState {
  username: null | string;
  instance: string;
  token: null | string;
  logoutMode: boolean;
  darkMode: boolean;
  sendErrorMonitoring: boolean;
  language: 'en' | 'fr';
  dialogAddVideoToPlaylist: {
    isOpen: boolean;
    video: null | Video;
  };
  customInstances: CustomInstance[];
}

const appState: AppState = {
  username: 'User',
  instance: null,
  token: null,
  logoutMode: false,
  darkMode: false,
  sendErrorMonitoring: false,
  language: 'en',
  dialogAddVideoToPlaylist: {
    isOpen: false,
    video: null
  },
  customInstances: []
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
      lastPlays,
      customInstances
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
      AsyncStorage.getItem('lastPlays'),
      AsyncStorage.getItem('customInstances')
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
      lastPlays: JSON.parse(lastPlays) ?? [],
      customInstances: JSON.parse(customInstances) ?? []
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
  setDarkMode: async (
    store: Store,
    actions: any,
    darkMode: boolean
  ): Promise<Store> => {
    try {
      await AsyncStorage.setItem('darkMode', String(darkMode));
    } catch (error) {
      return actions.setSnackbar(error);
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
  }),
  setCustomInstance: async (store: Store, actions: any, instance: any) => {
    const customInstances = [...store.customInstances, instance];
    await AsyncStorage.setItem(
      'customInstances',
      JSON.stringify(customInstances)
    );

    return {
      ...store,
      customInstances
    };
  },
  removeCustomInstance: async (
    store: Store,
    actions: any,
    instanceUri: string
  ) => {
    const customInstances = store.customInstances.filter(
      ({ uri }) => uri !== instanceUri
    );

    await AsyncStorage.setItem(
      'customInstances',
      JSON.stringify(customInstances)
    );

    return {
      ...store,
      customInstances
    };
  }
};

export { appState, appActions };
