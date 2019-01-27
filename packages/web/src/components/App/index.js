// @flow
import React from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from '@react-navigation/core';
import { createBrowserApp } from '@react-navigation/web';
import { Provider, actions } from '@youtube-audio-player/core';
import { LoginScreen, DashboardScreen, FavorisScreen } from '../../screens';
import { AudioContainer } from '../../containers';

type Props = {
  navigation: Object,
  descriptors: Object
};

class App extends React.Component<Props> {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    const activeKey = navigation.state.routes[navigation.state.index].key;

    if (token) {
      await actions.addUserToken(token);
      await actions.getUserInformations();
      await actions.setConnected();
    }

    if (token && activeKey === 'LoginScreen') {
      return this.props.navigation.navigate('DashboardScreen');
    }

    if (!token) {
      return this.props.navigation.navigate('LoginScreen');
    }
  }

  render() {
    const { descriptors, navigation } = this.props;
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];

    return (
      <Provider>
        <ScrollView>
          <SceneView
            component={descriptor.getComponent()}
            navigation={descriptor.navigation}
          />
          <AudioContainer />
        </ScrollView>
      </Provider>
    );
  }
}

const AppNavigator = createNavigator(
  App,
  SwitchRouter({
    LoginScreen,
    DashboardScreen,
    FavorisScreen
  }),
  {}
);

export default createBrowserApp(AppNavigator);
