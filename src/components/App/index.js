import React from 'react';
import { ActivityIndicator, DeviceEventEmitter } from 'react-native';
import QuickActions from 'react-native-quick-actions';
import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { createRootNavigator } from '../../navigation/TabNavigator';
import { actions } from '../../store';
import AudioContainer from '../../containers/Audio';

QuickActions.isSupported((error, supported) => {
  if (supported) {
    QuickActions.setShortcutItems([
      {
        type: 'Orders',
        title: 'Favoris',
        icon: 'Compose', // Pass any of UIApplicationShortcutIconType<name>
        userInfo: {
          url: 'app://favoris' // provide custom data, like in-app url you want to open
        }
      },
      {
        type: 'Orders',
        title: 'Playlist',
        icon: 'Compose', // Pass any of UIApplicationShortcutIconType<name>
        userInfo: {
          url: 'app://playlist' // provide custom data, like in-app url you want to open
        }
      }
    ]);
  }
});

// DeviceEventEmitter.addListener('quickActionShortcut', data => {
//   alert(data.title);
// });

QuickActions.popInitialAction().then(data => {
  switch (true) {
    case data.title === 'Favoris':
      alert('go to favoris screen');
      break;
    case data.title === 'Playlist':
      NavigationActions.navigate({
        routeName: 'Playlist'
      });
      break;
    default:
      break;
  }
});

class App extends React.Component {
  state = {
    checkedLogged: false,
    isLogged: false
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      await actions.addUserToken(token);
      await actions.getUserInformations();
      await actions.setConnected();
      await actions.search();

      return this.setState({
        isLogged: true,
        checkedLogged: true
      });
    }

    this.setState({
      checkedLogged: true
    });
  }

  test() {
    alert('yeah');
  }

  render() {
    const { checkedLogged, isLogged } = this.state;
    const Layout = createRootNavigator(isLogged);

    if (!checkedLogged) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <Layout key={1} />
        <AudioContainer />
      </>
    );
  }
}

export default App;
