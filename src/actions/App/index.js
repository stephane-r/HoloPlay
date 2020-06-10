import AsyncStorage from '@react-native-community/async-storage';
import { apiState } from '../Api';

const appState = {
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
  appInit: async state => {
    const [darkMode, searchHistory, instance, token] = await Promise.all([
      AsyncStorage.getItem('darkMode'),
      AsyncStorage.getItem('searchHistory'),
      AsyncStorage.getItem('instance'),
      AsyncStorage.getItem('token')
    ]);

    return {
      ...state,
      darkMode: darkMode === 'true',
      history: searchHistory ? JSON.parse(searchHistory) : [],
      instance,
      token
    };
  },
  setConnected: state => {
    return {
      ...state,
      isConnected: true,
      loginIsFecthing: false
    };
  },
  setLoginIsFetching: async state => {
    return {
      ...state,
      loginIsFecthing: true
    };
  },
  setLoginIsFetched: async state => {
    return {
      ...state,
      loginIsFecthing: false
    };
  },
  logout: async state => {
    await AsyncStorage.removeItem('userToken');

    return {
      ...state,
      ...apiState
    };
  },
  setFlashMessage: async (state, actions, message) => {
    return {
      ...state,
      flashMessage: {
        message,
        visible: true
      }
    };
  },
  hideFlashMessage: async state => {
    return {
      ...state,
      flashMessage: {
        ...state.flashMessage,
        visible: false
      }
    };
  },
  setDarkMode: async (state, actions, darkMode) => {
    try {
      await AsyncStorage.setItem('darkMode', String(darkMode));
    } catch (error) {
      return actions.setFlashMessage(error);
    }

    return {
      ...state,
      darkMode
    };
  }
};

export { appState, appActions };
