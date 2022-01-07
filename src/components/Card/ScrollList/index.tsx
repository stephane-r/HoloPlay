import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView as RNScrollView } from 'react-native-gesture-handler';

export const ScrollView: React.FC = ({ children }) => (
  <RNScrollView horizontal style={styles.list}>
    {children}
  </RNScrollView>
);

const styles = StyleSheet.create({
  list: {
    paddingTop: 23,
    marginHorizontal: -8
  }
});
