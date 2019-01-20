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

      return {
        ...state,
        jwt,
        user
      };
    } catch (error) {
      console.log(error);

      return state;
    }
  }
};

export { apiState, apiActions };
