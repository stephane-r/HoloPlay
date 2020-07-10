const shell = require('shelljs');

shell.exec('cp .env.dist .env');

const envs = [
  {
    value: 'KEYSTORE_PASSWORD',
    property: process.env.KEYSTORE_PASSWORD
  },
  {
    value: 'CODE_PUSH_LOGIN_KEY',
    property: process.env.CODE_PUSH_LOGIN_KEY
  },
  {
    value: 'CODE_PUSH_DEPLOY_KEY',
    property: process.env.CODE_PUSH_DEPLOY_KEY
  },
  {
    value: 'SENTRY_DSN_KEY',
    property: process.env.SENTRY_DSN_KEY
  }
];

envs.forEach(({ value, property }) =>
  shell.exec(`echo ${value}=${property} >> .env`)
);
