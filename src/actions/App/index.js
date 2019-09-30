import AsyncStorage from '@react-native-community/async-storage';
import { apiState } from '../Api';

const appState = {
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
    const darkMode = await AsyncStorage.getItem('darkMode');
    const userId = await AsyncStorage.getItem('userId');
    const searchHistory = await AsyncStorage.getItem('searchHistory');

    return {
      ...state,
      darkMode: darkMode === 'true',
      userId: Number(userId),
      history: searchHistory ? JSON.parse(searchHistory) : []
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
