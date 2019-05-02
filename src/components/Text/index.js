// @flow
import * as React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';

type Props = {
  text: string,
  bold: boolean
};

const Text = ({ text, bold }: Props) => (
  <RnText
    style={[
      styles.default,
      { fontFamily: bold ? 'DINPro-Bold' : 'DINPro-Regular' }
    ]}>
    {text}
  </RnText>
);

Text.defaultProps = {
  bold: false
};

const styles = StyleSheet.create({
  default: {
    fontSize: 14
  }
});

export default Text;
