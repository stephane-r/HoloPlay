/* eslint-disable react/display-name */
import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import DashboardScreen from '../screens/Dashboard';
import FavorisScreen from '../screens/Favoris';
import PlaylistScreen from '../screens/Playlist';

const AuthenticationNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="home"
            size={23}
            style={{ color: tintColor }} />
        ),
        tabBarColor: '#2575f4'
      }
    },
    Playlist: {
      screen: PlaylistScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="headset"
            size={23}
            style={{ color: tintColor }} />
        ),
        tabBarColor: '#0455BF'
      }
    },
    Favoris: {
      screen: FavorisScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="favorite"
            size={23}
            style={{ color: tintColor }} />
        ),
        tabBarColor: '#EE05F2'
      }
    }
  },
  {
    shifting: true,
    headerMode: 'none'
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppNavigator,
      Auth: AuthenticationNavigator
    },
    {
      initialRouteName: 'Loading'
    }
  )
);
