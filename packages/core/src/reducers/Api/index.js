import { AsyncStorage } from 'react-native';
import callApi from '../../utils/callApi';
import api from '../../config/api';

const apiState = {
  jwt: null,
  user: null
};

const apiActions = {
  registerThroughApi: async state => {
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

    console.log(user);

    return {
      ...state,
      user
    };
  },
  addSourceToFavoris: async (state, action, source) => {
    const { _id, favoris, favorisIds } = state.user;
    const userUpdated = {
      favoris: [...favoris, source],
      favorisIds: [...favorisIds, source.id]
    };
    const user = {
      ...state.user,
      ...userUpdated
    };

    const headers = { Authorization: `Bearer ${state.jwt}` };
    await callApi(api.update(_id), 'put', userUpdated, headers);

    return {
      ...state,
      user
    };
  },
  removeSourceFromFavoris: async (state, action, source) => {
    const { _id, favoris, favorisIds } = state.user;
    const favorisFiltered = favoris.filter(item => item.id !== source.id);
    const favorisIdsFiltered = favorisIds.filter(id => id !== source.id);
    const userUpdated = {
      favoris: favorisFiltered,
      favorisIds: favorisIdsFiltered
    };
    const user = {
      ...state.user,
      ...userUpdated
    };

    const headers = { Authorization: `Bearer ${state.jwt}` };
    await callApi(api.update(_id), 'put', userUpdated, headers);

    return {
      ...state,
      user
    };
  },
  updateUser: async (state, actions, userUpdated) => {
    const { _id } = state.user;
    const headers = { Authorization: `Bearer ${state.jwt}` };
    await callApi(api.update(_id), 'put', userUpdated, headers);

    return state;
  }
};

export { apiState, apiActions };
