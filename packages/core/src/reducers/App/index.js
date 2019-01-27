import { AsyncStorage } from 'react-native';
import { apiState } from '../Api';

const appState = {
  isConnected: false
};

const appActions = {
  setConnected: state => {
    return {
      ...state,
      isConnected: true
    };
  },
  logout: async state => {
    await AsyncStorage.removeItem('userToken');

    return {
      ...state,
      ...apiState
    };
  }
};

export { appState, appActions };
