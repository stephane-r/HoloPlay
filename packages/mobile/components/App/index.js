import React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Provider, actions } from '@youtube-audio-player/core';
import { createRootNavigator } from '../../navigation/TabNavigator';

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

      return this.setState({
        isLogged: true,
        checkedLogged: true
      });
    }

    return this.setState({
      checkedLogged: true
    });
  }

  render() {
    const { checkedLogged, isLogged } = this.state;
    const Layout = createRootNavigator(isLogged);

    if (!checkedLogged) {
      return <ActivityIndicator />;
    }

    return <Layout />;
  }
}

export default App;
