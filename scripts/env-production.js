const shell = require('shelljs');

const envs = [
  {
    value: 'APP_NAME',
    property: 'yap'
  },
  {
    value: 'YOUTUBE_API_KEY',
    property: 'AIzaSyD4pyuFpgd3h_IgQAEjSFvsYHsCysoilr8'
  },
  {
    value: 'YOUTUBE_API_STREAM_URL',
    property: 'audio.stephane-richin.fr'
  },
  {
    value: 'API_URL',
    property: 'api.stephane-richin.fr'
  },
  {
    value: 'CODE_PUSH_LOGIN_KEY',
    property: '62f1338ca8c15c8653b9225a48ddccd4802815e2'
  },
  {
    value: 'KEYSTORE_PASSWORD',
    property: 'yaptest'
  },
  {
    value: 'CODE_PUSH_DEPLOY_KEY',
    property: 'y34kCULBz3YcrDjwE1whnp1Jrj0kcba0c218-c02b-4e08-8f34-202298c95a54'
  }
];

envs.forEach(({ value, property }) =>
  shell.exec(`echo ${value}=${property} >> .env`)
);
