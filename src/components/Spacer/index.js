// @flow
import React from 'react';
import { View } from 'react-native';

type Props = {
  width: number,
  height: number
};

const Spacer = ({ width, height }: Props) => <View style={{ width, height }} />;

Spacer.defaultProps = {
  width: 0,
  height: 0
};

export default Spacer;
