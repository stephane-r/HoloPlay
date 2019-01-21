import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './TabNavigator';

export default createSwitchNavigator({
  Main: MainTabNavigator
});
