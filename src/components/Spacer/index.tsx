import React from 'react';
import { View } from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

const Spacer: React.FC<Props> = ({ width, height }) => (
  <View style={{ width, height }} />
);

Spacer.defaultProps = {
  width: 0,
  height: 0
};

export default Spacer;
