import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  percentage: number;
}

const Progress: React.FC<Props> = ({ percentage }) => (
  <View style={[styles.progress, { width: `${percentage}%` }]} />
);

const styles = StyleSheet.create({
  progress: {
    height: 10,
    backgroundColor: 'blue'
  }
});

export default Progress;