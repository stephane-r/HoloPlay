import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

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

const AppNavigator = createBottomTabNavigator(
  {
    Dashboard: DashboardScreen,
    Favoris: FavorisScreen,
    Playlist: PlaylistScreen
  },
  {
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
