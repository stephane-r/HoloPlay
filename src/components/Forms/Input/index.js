// @flow
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Label from '../Label';

type Props = {
  label?: string,
  placeholder?: string,
  value?: string,
  transparent: boolean,
  onChangeText: Function
};

const Input = ({ label, transparent, ...props }: Props) => (
  <>
    {label && <Label label={label} />}
    <TextInput
      {...props}
      style={[styles.default, transparent && styles.transparent]}
    />
  </>
);

Input.defaultProps = {
  transparent: false
};

const styles = StyleSheet.create({
  default: {
    borderRadius: 20,
    height: 40,
    backgroundColor: 'white',
    fontSize: 14,
    fontFamily: 'DINPro-Regular',
    paddingHorizontal: 20
  },
  transparent: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
});

export default Input;
