import 'react-native-gesture-handler';
import config from 'react-native-config';
import QuickActions from 'react-native-quick-actions';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import App from './src/components/App';
import { quickActionShortcutItems } from './config/quickAction';
import { Button } from 'react-native-paper';

// QuickActions.isSupported((error, supported) => {
//   if (supported) {
//     return QuickActions.setShortcutItems(quickActionShortcutItems);
//   }

//   return error;
// });

export default () => {
  // if (store.sendErrorMonitoring) {
  //   Sentry.init({
  //     dsn: config.SENTRY_DSN_KEY
  //   });
  // }

  return <App />;
};
