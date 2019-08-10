// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { version } from '../../../package';

type AppVersionProps = {
  customStyle?: Object
};

const AppVersion = ({ customStyle }: AppVersionProps) => (
  <Text style={[styles.text, customStyle]}>Version {version}</Text>
);

const styles = StyleSheet.create({
  text: { marginTop: 'auto', padding: 10, fontSize: 11 }
});

export default AppVersion;
