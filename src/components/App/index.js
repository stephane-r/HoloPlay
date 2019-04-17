import React from 'react';
import QuickActions from 'react-native-quick-actions';
import AppContainer from '../../navigation/TabNavigator';
import AudioContainer from '../../containers/Audio';
import NavigationService from '../../navigation/NavigationService';

QuickActions.isSupported((error, supported) => {
  if (supported) {
    return QuickActions.setShortcutItems([
      {
        type: 'Orders',
        title: 'Favoris',
        icon: 'Compose',
        userInfo: {
          url: 'app://favoris'
        }
      },
      {
        type: 'Orders',
        title: 'Playlist',
        icon: 'Compose',
        userInfo: {
          url: 'app://playlist'
        }
      }
    ]);
  }

  return error;
});

// DeviceEventEmitter.addListener('quickActionShortcut', data => {
//   alert(data.title);
// });

QuickActions.popInitialAction().then(data => {
  switch (true) {
    case data.title === 'Favoris':
      setTimeout(() => NavigationService.navigate('Favoris'), 200);
      break;
    case data.title === 'Playlist':
      setTimeout(() => NavigationService.navigate('Playlist'), 200);
      break;
    default:
      break;
  }
});

class App extends React.Component {
  render() {
    return (
      <>
        <AppContainer
          ref={navigatorRef =>
            NavigationService.setTopLevelNavigator(navigatorRef)
          }
        />
        <AudioContainer />
      </>
    );
  }
}

export default App;
