import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
// import './rn-addons';

configure(() => {
  require('./stories');
}, module);

const StorybookUI = getStorybookUI();

AppRegistry.registerComponent('HoloPlay', () => StorybookUI);

export default StorybookUI;
