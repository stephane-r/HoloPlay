import React from 'react';
import config from 'react-native-config';
// eslint-disable-next-line import/no-unresolved
import QuickActions from 'react-native-quick-actions';
import AppContainer from '../../navigation/TabNavigator';
import AudioContainer from '../../containers/Audio';
import StorybookUI from '../../../storybook';

const { STORYBOOK } = config;

QuickActions.isSupported((error, supported) => {
  if (supported) {
    return QuickActions.setShortcutItems([
      {
        type: 'Orders',
        title: 'Playlist',
        icon: 'Compose',
        userInfo: {
          url: 'app://playlist'
        }
      },
      {
        type: 'Orders',
        title: 'Favoris',
        icon: 'Compose',
        userInfo: {
          url: 'app://favoris'
        }
      }
    ]);
  }

  return error;
});

const App = () => {
  if (STORYBOOK === 'true') {
    return <StorybookUI />;
  }

  return (
    <>
      <AppContainer />
      <AudioContainer />
    </>
  );
};

export default App;
