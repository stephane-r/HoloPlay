import React from 'react';
import { ScrollView } from 'react-native';
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from '@react-navigation/core';
import { createBrowserApp, Link } from '@react-navigation/web';
import { Provider } from '@youtube-audio-player/core';
import DashboardScreen from '../../screens/Dashboard';
import LoginScreen from '../../screens/Login';

class Layout extends React.Component {
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
  Layout,
  SwitchRouter({
    LoginScreen,
    DashboardScreen
  }),
  {}
);

const App = createBrowserApp(AppNavigator);

export default App;
