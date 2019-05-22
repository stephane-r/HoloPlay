// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../Text';
import Spacer from '../Spacer';

type Props = {
  level: string,
  title: string,
  color: string,
  spacer: number,
  customStyle: Object
};

const Title = ({ level, title, color, spacer, customStyle }: Props) => (
  <>
    <Text
      customStyle={[
        styles.default,
        styles[`h${level}`],
        { color },
        customStyle
      ]}
      numberOfLines={2}>
      {title}
    </Text>
    {spacer > 0 && <Spacer height={spacer} />}
  </>
);

Title.defaultProps = {
  spacer: 0,
  color: 'black',
  customStyle: {}
};

const styles = StyleSheet.create({
  default: {},
  h1: {
    fontFamily: 'DINPro-Bold',
    fontSize: 43
  },
  h2: {
    fontFamily: 'DINPro-Medium',
    fontSize: 27
  },
  h3: {
    fontFamily: 'DINPro-Medium',
    fontSize: 20
  }
});

export default Title;
