// @flow
import { API_URL } from '../config/env';

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

  try {
    const request = await fetch(`http://${API_URL}${slug}`, params);
    const response = await request.json();

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default callApi;
