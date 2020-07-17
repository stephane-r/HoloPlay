import 'react-native-gesture-handler';
import config from 'react-native-config';
import QuickActions from 'react-native-quick-actions';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
import { Provider } from './src/store';
import AppContainer from './src/containers/App';
import { quickActionShortcutItems } from './config/quickAction';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: config.SENTRY_DSN_KEY
  });
}

QuickActions.isSupported((error, supported) => {
  if (supported) {
    return QuickActions.setShortcutItems(quickActionShortcutItems);
  }

  return error;
});

const App = () => {
  useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  });

  return (
    <Provider>
      <AppContainer />
    </Provider>
  );
};

export default codePush(App);
