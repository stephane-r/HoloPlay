// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spacer from '../../Spacer';
import Text from '../../Text';

type Props = {
  label: string
};

const Label = ({ label }: Props) => (
  <View style={styles.default}>
    <Text>{label}</Text>
    <Spacer height={10} />
  </View>
);

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    fontFamily: 'DINPro-Regular',
    paddingHorizontal: 20
  }
});

export default Label;
