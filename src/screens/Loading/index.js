import React from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import QuickActions from 'react-native-quick-actions';
import { actions } from '../../store';

class LoadingScreen extends React.Component {
  static path = 'loading';

  static navigationOptions = () => ({
    title: 'Loading',
    linkName: 'Loading'
  });

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');

    // if (token) {
    // await actions.addUserToken(token);
    // await actions.getUserInformations();
    // await actions.setConnected();
    // await actions.search();

    // return this.props.navigation.navigate('App');
    // }

    // return this.props.navigation.navigate('Auth');

    QuickActions.popInitialAction().then(async data => {
      if (token) {
        await actions.addUserToken(token);
        await actions.getUserInformations();
        await actions.setConnected();
        await actions.search();

        if (data && data.title) {
          switch (true) {
            case data.title === 'Favoris':
              return this.props.navigation.navigate('Favoris');
            case data.title === 'Playlist':
              return this.props.navigation.navigate('Playlist');
          }
        }

        return this.props.navigation.navigate('App');
      }

      return this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return <ActivityIndicator />;
  }
}

export default LoadingScreen;
