import React from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import { actions } from '@youtube-audio-player/core';
import { createRootNavigator } from '../../navigation/TabNavigator';
import { AudioContainer } from '../../containers';

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

    return (
      <View>
        <Layout />
        <AudioContainer />
      </View>
    );
  }
}

export default App;
