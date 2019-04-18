import React from 'react';
import { STORYBOOK } from 'react-native-dotenv';
// eslint-disable-next-line import/no-unresolved
import QuickActions from 'react-native-quick-actions';
import AppContainer from '../../navigation/TabNavigator';
import AudioContainer from '../../containers/Audio';
import StorybookUI from '../../../storybook';

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

class App extends React.Component {
  render() {
    // if (STORYBOOK === 'true') {
    //   return <StorybookUI isEnabled={STORYBOOK} />;
    // }

    return (
      <>
        {STORYBOOK === 'true' ? (
          <StorybookUI />
        ) : (
          <>
            <AppContainer />
            <AudioContainer />
          </>
        )}
      </>
    );
  }
}

export default App;
