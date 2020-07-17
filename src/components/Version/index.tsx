import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { version } from '../../../package';

interface Props {
  customStyle?: {
    [key: string]: string | number;
  };
}

const AppVersion: React.FC<Props> = ({ customStyle }) => (
  <Text accessibilityStates={[]} style={[styles.text, customStyle]}>
    Version {version}
  </Text>
);

const styles = StyleSheet.create({
  text: { marginTop: 'auto', padding: 10, fontSize: 11 }
});

export default AppVersion;
