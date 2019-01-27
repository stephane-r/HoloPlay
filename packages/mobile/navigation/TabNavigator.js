import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import LoginScreen from '../screens/Login';
import DashboardScreen from '../screens/Dashboard';
import FavorisScreen from '../screens/Favoris';

export const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Loading'
    }
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
