import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text, StyleSheet } from 'react-native';

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
};

const CenteredView = ({ children }) => <View style={style}>{children}</View>;

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

storiesOf('CenteredView', module)
  .add('default view', () => (
    <CenteredView>
      <AppText>Hello Storybook</AppText>
      <AppText bold>Hello bold Storybook</AppText>
    </CenteredView>
  ))
  .add('default vieww', () => (
    <CenteredView>
      <Text>Hello</Text>
    </CenteredView>
  ));
