import React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Provider } from '@youtube-audio-player/core';
import { createRootNavigator } from '../../navigation/TabNavigator';

class App extends React.Component {
  state = {
    checkedLogged: false,
    isLogged: false
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      this.setState({
        isLogged: true,
        checkedLogged: true
      });
    }
  }

  render() {
    const { checkedLogged, isLogged } = this.state;
    const Layout = createRootNavigator(isLogged);

    if (!checkedLogged) {
      return <ActivityIndicator />;
    }

    return (
      <Provider>
        <Layout />
      </Provider>
    );
  }
}

export default App;
