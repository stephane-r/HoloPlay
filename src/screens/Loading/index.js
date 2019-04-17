import React from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../store';

class LoadingScreen extends React.Component {
  static path = 'loading';

  static navigationOptions = () => ({
    title: 'Loading',
    linkName: 'Loading'
  });

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      await actions.addUserToken(token);
      await actions.getUserInformations();
      await actions.setConnected();
      await actions.search();

      return this.props.navigation.navigate('App');
    }

    return this.props.navigation.navigate('Auth');
  }

  render() {
    return <ActivityIndicator />;
  }
}

export default LoadingScreen;
