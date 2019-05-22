// @flow
import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Text from '../../Text';
import Icon from '../../Icon';

type Props = {
  title: string,
  onPress: Function,
  isLoading: Boolean | boolean,
  icon?: string
};

const Button = ({ title, onPress, icon, isLoading }: Props) => (
  <TouchableNativeFeedback onPress={onPress}>
    {isLoading ? (
      <View style={!icon && styles.default}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={!icon && styles.default}>
        {icon ? (
          <Icon
            name={icon}
            height="20"
            width="20" />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    )}
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
