import React from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from '@react-navigation/core';
import { createBrowserApp } from '@react-navigation/web';
import { Provider, actions } from '@youtube-audio-player/core';
import { LoginScreen, DashboardScreen } from '@youtube-audio-player/components';

class App extends React.Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      await actions.addUserToken(token);
      await actions.getUserInformations();
      // await actions.setConnected();
      return this.props.navigation.navigate('DashboardScreen');
    }

    return this.props.navigation.navigate('LoginScreen');
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
        </ScrollView>
      </Provider>
    );
  }
}

const AppNavigator = createNavigator(
  App,
  SwitchRouter({
    LoginScreen,
    DashboardScreen
  }),
  {}
);

export default createBrowserApp(AppNavigator);
