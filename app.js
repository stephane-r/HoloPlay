import 'react-native-gesture-handler';
import config from 'react-native-config';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
import { Provider } from './src/store';
import AppContainer from './src/containers/App';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: config.SENTRY_DSN_KEY
  });
}

const App: React.FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
      });
    }
  });

  return (
    <Provider>
      <AppContainer />
    </Provider>
  );
};

export default codePush(App);
