import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text, StyleSheet } from 'react-native';
import {
  InputStory,
  InputLabelStory
} from '../src/components/Forms/Input/index.story';

const AppText = ({ children, bold }) => (
  <Text style={[styles.text, bold && styles.textBold]}>{children}</Text>
);

AppText.defaultProps = {
  bold: false
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DINPro-Regular'
  },
  textBold: {
    fontFamily: 'DINPro-Bold'
  }
});

storiesOf('Forms', module)
  .add('Input', () => <InputStory />)
  .add('Input with label', () => <InputLabelStory />);
