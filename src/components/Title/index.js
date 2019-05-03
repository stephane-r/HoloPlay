// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../Text';
import Spacer from '../Spacer';

type Props = {
  level: string,
  title: string,
  spacer: number
};

const Title = ({ level, title, spacer }: Props) => (
  <>
    <Text
      text={title}
      customStyle={[styles.default, styles[`h${level}`]]} />
    {spacer > 0 && <Spacer height={spacer} />}
  </>
);

Title.defaultProps = {
  spacer: 0
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
