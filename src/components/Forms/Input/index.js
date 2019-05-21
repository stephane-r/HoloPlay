// @flow
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Label from '../Label';
import Spacer from '../../Spacer';

type Props = {
  label?: string,
  placeholder?: string,
  value?: string,
  transparent: boolean,
  spacer: number,
  onChangeText: Function
};

const Input = ({ label, transparent, spacer, ...props }: Props) => (
  <>
    {label && <Label label={label} />}
    <TextInput
      {...props}
      style={[styles.default, transparent && styles.transparent]}
    />
    {spacer && <Spacer height={spacer} />}
  </>
);

Input.defaultProps = {
  transparent: false,
  spacer: 20
};

const styles = StyleSheet.create({
  default: {
    borderRadius: 4,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, .2)',
    fontSize: 14,
    fontFamily: 'DINPro-Regular',
    paddingHorizontal: 20
  },
  transparent: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
});

export default Input;
