import React from 'react';
import { ScrollView } from 'react-native';
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from '@react-navigation/core';
import { createBrowserApp, Link } from '@react-navigation/web';
import { Provider } from '@youtube-audio-player/core';
import { LoginScreen, DashboardScreen } from '@youtube-audio-player/components';

class App extends React.Component {
  render() {
    const { descriptors, navigation } = this.props;
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];

    return (
      <Provider>
        <ScrollView>
          <Link routeName="LoginScreen">Login</Link>
          <Link routeName="DashboardScreen">Dashboard</Link>
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
