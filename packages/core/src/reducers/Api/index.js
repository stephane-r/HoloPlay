import { AsyncStorage } from 'react-native';
import callApi from '../../utils/callApi';
import api from '../../config/api';

const apiState = {
  jwt: null,
  user: null
};

const apiActions = {
  registerThroughApi: async (state, actions, formData) => {
    return state;
  },
  loginThroughApi: async (state, actions, formData) => {
    try {
      const { jwt, user } = await callApi(api.login, 'post', formData);
      await AsyncStorage.setItem('userToken', jwt);

      return {
        ...state,
        jwt,
        user
      };
    } catch (error) {
      console.log(error);

      return state;
    }
  },
  addUserToken: (state, actions, jwt) => {
    return {
      ...state,
      jwt
    };
  },
  getUserInformations: async state => {
    const user = await callApi(api.me, 'get', null, {
      Authorization: `Bearer ${state.jwt}`
    });

    return {
      ...state,
      user
    };
  }
};

export { apiState, apiActions };
