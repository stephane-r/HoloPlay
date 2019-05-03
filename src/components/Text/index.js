// @flow
import * as React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';

type Props = {
  customStyle?: Object,
  children: React.Node,
  bold: boolean
};

const Text = ({ customStyle, children, bold }: Props) => (
  <RnText
    style={[
      styles.default,
      { fontFamily: bold ? 'DINPro-Bold' : 'DINPro-Regular' },
      customStyle
    ]}>
    {children}
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
