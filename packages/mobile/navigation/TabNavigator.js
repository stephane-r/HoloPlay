import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import { LoginScreen, DashboardScreen } from '@youtube-audio-player/components';

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login'
};

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen
});

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard'
};

export default createMaterialTopTabNavigator(
  {
    LoginStack,
    DashboardStack
  },
  {
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#fff'
      },
      indicatorStyle: {
        backgroundColor: '#000'
      }
    }
  }
);
