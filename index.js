import { AppRegistry } from 'react-native';
import React from 'react';
import './src/i18n';
import App from './app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
