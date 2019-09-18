const shell = require('shelljs');

const envs = [
  // {
  //   value: 'APP_NAME',
  //   property: 'yap'
  // },
  {
    value: 'YOUTUBE_API_KEY',
    property: process.env.YOUTUBE_API_KEY
  },
  {
    value: 'YOUTUBE_API_STREAM_URL',
    property: process.env.YOUTUBE_API_STREAM_URL
  },
  {
    value: 'API_URL',
    property: process.env.API_URL
  },
  {
    value: 'CODE_PUSH_LOGIN_KEY',
    property: process.env.CODE_PUSH_LOGIN_KEY
  },
  {
    value: 'KEYSTORE_PASSWORD',
    property: process.env.KEYSTORE_PASSWORD
  },
  {
    value: 'CODE_PUSH_DEPLOY_KEY',
    property: process.env.CODE_PUSH_DEPLOY_KEY
  }
];

envs.forEach(({ value, property }) =>
  shell.exec(`echo ${value}=${property} >> .env`)
);
