import AsyncStorage from '@react-native-community/async-storage';
import { apiState } from '../Api';

const appState = {
  isConnected: false,
  loginIsFetching: false,
  isSearching: false,
  flashMessage: {
    message: null,
    visible: false
  },
  darkMode: false
};

const appActions = {
  appInit: async state => {
    const darkMode = await AsyncStorage.getItem('darkMode');

    return {
      ...state,
      darkMode: darkMode === 'true'
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
  setIsSearching: async state => {
    return {
      ...state,
      isSearching: true
    };
  },
  setIsSearched: async state => {
    return {
      ...state,
      isSearching: false
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
