// @flow
import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Text from '../../Text';

type Props = {
  title: string,
  onPress: Function,
  isLoading: Boolean | boolean
};

const Button = ({ title, onPress, isLoading }: Props) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.default}>
      {isLoading ? <ActivityIndicator /> : <Text>{title}</Text>}
    </View>
  </TouchableNativeFeedback>
);

Button.defaultProps = {
  isLoading: false
};

const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 40,
    backgroundColor: 'rgba(128, 128, 128, .2)',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, .4)',
    fontSize: 14,
    fontFamily: 'DINPro-Regular',
    paddingHorizontal: 20
  }
});

export default Button;
