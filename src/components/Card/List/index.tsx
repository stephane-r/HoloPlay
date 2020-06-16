import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardList: React.FC = ({ children }) => (
  <View style={styles.list}>{children}</View>
);

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 23,
    marginHorizontal: -8
  }
});

export default CardList;
