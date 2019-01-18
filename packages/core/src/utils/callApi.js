import { API_URL } from '../config/env';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const callApi = async (slug, method, body = null, headers = defaultHeaders) => {
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
