import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardList = ({ children }) => <View style={styles.list}>{children}</View>;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingTop: 23
  }
});

export default CardList;
