const shell = require('shelljs');

const envs = [
  {
    value: 'SENTRY_DSN_KEY',
    property: process.env.SENTRY_DSN_KEY
  }
];

envs.forEach(({ value, property }) =>
  shell.exec(`echo ${value}=${property} >> .env`)
);
