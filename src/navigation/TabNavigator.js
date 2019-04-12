import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import DashboardScreen from '../screens/Dashboard';
import FavorisScreen from '../screens/Favoris';
import PlaylistScreen from '../screens/Playlist';

export const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  }
});

export const AppStack = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: 'Dashboard'
      }
    },
    Favoris: {
      screen: FavorisScreen,
      navigationOptions: {
        tabBarLabel: 'Favoris'
      }
    },
    Playlist: {
      screen: PlaylistScreen,
      navigationOptions: {
        tabBarLabel: 'Playlist'
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: 0
      }
    }
  }
);

export const createRootNavigator = (isLogged = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: AppStack
      },
      SignedOut: {
        screen: LoginStack
      }
    },
    {
      initialRouteName: isLogged ? 'SignedIn' : 'SignedOut'
    }
  );
};
