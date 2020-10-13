import { AppRegistry } from 'react-native';
import { setConsole } from 'react-query';
import './src/i18n';
import App from './app';
import { name as appName } from './app.json';

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn
});

AppRegistry.registerComponent(appName, () => App);
