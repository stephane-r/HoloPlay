import React from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createRootNavigator } from '../../navigation/TabNavigator';
import { actions } from '../../store';
import AudioContainer from '../../containers/Audio';

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
      <>
        <Layout key={1} />
        <AudioContainer />
      </>
    );
  }
}

export default App;
