import React from 'react';
import { View, StyleSheet } from 'react-native';

const Progress = ({ percentage }) => (
  <View style={{ ...styles.progress, width: `${percentage}%` }} />
);

const styles = StyleSheet.create({
  progress: {
    height: 10,
    backgroundColor: 'blue'
  }
});

export default Progress;
