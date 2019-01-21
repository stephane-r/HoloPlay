import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';

const LoginStack = createStackNavigator({
  Login
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login'
};

const DashboardStack = createStackNavigator({
  Dashboard
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
