import 'react-native-gesture-handler';
import config from 'react-native-config';
import QuickActions from 'react-native-quick-actions';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
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

const App = () => {
  codePush.sync(
    {
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    },
    (status) => {
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('Checking for updates.');
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('Downloading package.');
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          console.log('Installing update.');
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          console.log('Up-to-date.');
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          console.log('Update installed.');
          break;
        case codePush.SyncStatus.AWAITING_USER_ACTION:
          console.log('Awaiting user action.');
          break;
        case codePush.SyncStatus.SYNC_IN_PROGRESS:
          console.log('Sync in progress.');
          break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
          console.log('Error');
          break;
      }
    }
  );

  return (
    <Provider>
      <AppContainer />
    </Provider>
  );
};

export default codePush()(App);
