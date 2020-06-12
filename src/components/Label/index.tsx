// @flow
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  align: 'left' | 'right';
  theme: string;
}

const Label: React.FC<Props> = ({ align, theme, children }) => (
  <Text
    accessibilityStates={[]}
    style={[styles.container, styles[align], { backgroundColor: theme }]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    borderRadius: 4,
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  left: {
    left: 10
  },
  right: {
    right: 10
  }
});

export default Label;
