import { AppRegistry } from 'react-native';
import './src/i18n';
import App from './app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
