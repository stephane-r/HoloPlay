import AsyncStorage from '@react-native-community/async-storage';

interface Args {
  url: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';
  body?: {
    [key: string]: string;
  };
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

const callApi = async ({ url, method, body }: Args): Promise<any> => {
  const [instance, token] = await Promise.all([
    AsyncStorage.getItem('instance'),
    AsyncStorage.getItem('token')
  ]);

  const params: any = {
    method: method ?? 'GET',
    headers: DEFAULT_HEADERS
  };

  if (token !== 'null') {
    params.headers = {
      ...params.headers,
      Authorization: `Bearer ${token}`
    };
  }

  if (body) {
    params.body = JSON.stringify(body);
  }

  if (__DEV__) {
    console.log(`${params.method} - ${instance}/api/v1/${url}`);
  }

  const request = await fetch(`${instance}/api/v1/${url}`, params);
  const response = await request.json();

  if (response.statusCode >= 400 && response.statusCode < 500) {
    throw Error(response);
  }

  return response;
};

export default callApi;
