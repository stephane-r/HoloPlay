import 'react-native-gesture-handler';
import config from 'react-native-config';
import QuickActions from 'react-native-quick-actions';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import { Provider } from './src/store';
import AppContainer from './src/containers/App';
import { quickActionShortcutItems } from './config/quickAction';
import { Button } from 'react-native-paper';

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

const App = () => (
  <Provider>
    <AppContainer />
  </Provider>
);

export default App;
