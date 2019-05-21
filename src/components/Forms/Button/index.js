// @flow
import React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import Text from '../../Text';

type Props = {
  label: string,
  onPress: Function
};

const Button = ({ label, onPress }: Props) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.default}>
      <Text>{label}</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, .2)',
    fontSize: 14,
    fontFamily: 'DINPro-Regular',
    paddingHorizontal: 20
  }
});

export default Button;
