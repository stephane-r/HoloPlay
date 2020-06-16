import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { FlashMessage } from '../../types/FlashMessage';

export interface AppState {
  instance: null | string;
  token: null | string;
  flashMessage: FlashMessage;
  darkMode: boolean;
}

const appState: AppState = {
  instance: null,
  token: null,
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
