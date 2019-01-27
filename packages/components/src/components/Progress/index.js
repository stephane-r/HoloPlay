// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  percentage: number
};

const Progress = ({ percentage }: Props) => (
  <View style={{ ...styles.progress, width: `${percentage}%` }} />
);

const styles = StyleSheet.create({
  progress: {
    height: 10,
    backgroundColor: 'blue'
  }
});

export default Progress;
