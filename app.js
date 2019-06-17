import React from 'react';
import codePush from 'react-native-code-push';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from './src/store';
import App from './src/components/App';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors
  }
};

class AppContainer extends React.Component {
  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }

  codePushStatusDidChange(status) {
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

  codePushDownloadDidProgress(progress) {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.'
    );
  }

  render() {
    return (
      <Provider>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </Provider>
    );
  }
}

export default codePush(AppContainer);
