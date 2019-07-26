// @flow
import config from 'react-native-config';
import errorApi from './errorApi';

const { API_URL } = config;

const defaultHeaders: Object = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const callApi = async (
  slug: string,
  method: string,
  body?: Object = null,
  headers?: Object = defaultHeaders
) => {
  let params = {
    method,
    headers
  };

  if (body) {
    params = {
      ...params,
      body: JSON.stringify(body)
    };
  }

  if (headers) {
    params = {
      ...params,
      headers: { ...defaultHeaders, ...headers }
    };
  }

  if (__DEV__) {
    console.log(`${method} - ${API_URL}${slug}`);
  }

  const request = await fetch(`http://${API_URL}${slug}`, params);
  const response = await request.json();

  if (response.statusCode >= 400 && response.statusCode < 500) {
    throw errorApi(response);
  }

  return response;
};

export default callApi;
