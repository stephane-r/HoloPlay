const shell = require('shelljs');

const envs = [
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
