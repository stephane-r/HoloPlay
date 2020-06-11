import AsyncStorage from '@react-native-community/async-storage';
import errorApi from './errorApi';

const callApi = async ({ url, method, body }) => {
  const [instance, token] = await Promise.all([
    AsyncStorage.getItem('instance'),
    AsyncStorage.getItem('token')
  ]);

  const params = {
    method: method ? method : 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  if (__DEV__) {
    console.log(`${params.method} - ${instance}${url}`);
  }

  const request = await fetch(`${instance}/api/v1/${url}`, params);
  const response = await request.json();

  if (response.statusCode >= 400 && response.statusCode < 500) {
    throw errorApi(response);
  }

  return response;
};

export default callApi;
