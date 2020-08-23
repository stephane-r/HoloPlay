import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CardScrollList: React.FC = ({ children }) => (
  <ScrollView horizontal style={styles.list}>
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  list: {
    paddingTop: 23,
    marginHorizontal: -8
  }
});

export default CardScrollList;
