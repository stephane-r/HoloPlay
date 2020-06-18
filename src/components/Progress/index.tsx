import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  height: number;
  color: string;
  percentage: number;
}

const Progress: React.FC<Props> = ({ height = 3, color, percentage }) => (
  <View style={{ height, backgroundColor: color, width: `${percentage}%` }} />
);

const styles = StyleSheet.create({
  progress: {
    height: 10
  }
});

export default Progress;
