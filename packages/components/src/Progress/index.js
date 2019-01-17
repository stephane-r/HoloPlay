import React from 'react';

const { View, StyleSheet } = require('react-native-web');

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
