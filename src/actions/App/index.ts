import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { FlashMessage } from '../../types/FlashMessage';

export interface AppState {
  instance: null | string;
  token: null | string;
  isConnected: boolean;
  loginIsFetching: boolean;
  flashMessage: FlashMessage;
  darkMode: boolean;
}

const appState: AppState = {
  instance: null,
  token: null,
  isConnected: false,
  loginIsFetching: false,
  flashMessage: {
    message: null,
    visible: false
  },
  darkMode: false
};

const appActions = {
  appInit: async (store: Store): Promise<Store> => {
    const [darkMode, searchHistory, instance, token] = await Promise.all([
      AsyncStorage.getItem('darkMode'),
      AsyncStorage.getItem('searchHistory'),
      AsyncStorage.getItem('instance'),
      AsyncStorage.getItem('token')
    ]);

    return {
      ...store,
      darkMode: darkMode === 'true',
      history: searchHistory ? JSON.parse(searchHistory) : [],
      instance,
      token
    };
  },
  setConnected: (store: Store): Store => {
    return {
      ...store,
      isConnected: true,
      loginIsFetching: false
    };
  },
  setLoginIsFetching: async (store: Store): Promise<Store> => {
    return {
      ...store,
      loginIsFetching: true
    };
  },
  setLoginIsFetched: async (store: Store): Promise<Store> => {
    return {
      ...store,
      loginIsFetching: false
    };
  },
  setFlashMessage: async (
    store: Store,
    actions: any,
    message: any
  ): Promise<Store> => {
    return {
      ...store,
      flashMessage: {
        message,
        visible: true
      }
    };
  },
  hideFlashMessage: async (store: Store): Promise<Store> => {
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
