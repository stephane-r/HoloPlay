import React from 'react';
// eslint-disable-next-line import/no-unresolved
import QuickActions from 'react-native-quick-actions';
import AppContainer from '../../navigation/TabNavigator';
import AudioContainer from '../../containers/Audio';

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

// DeviceEventEmitter.addListener('quickActionShortcut', data => {
//   alert(data.title);
// });

class App extends React.Component {
  render() {
    return (
      <>
        <AppContainer />
        <AudioContainer />
      </>
    );
  }
}

export default App;
