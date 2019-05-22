import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from './icons';

const Icon = ({ onPress, ...props }) => <SvgIcon
  {...props}
  svgs={svgs} />;

export default Icon;
