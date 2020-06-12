// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

interface Props {
  title: string;
  backgroundColor: string;
}

const Header: React.FC<Props> = ({ title, backgroundColor }) => (
  <View style={[styles.header, { backgroundColor }]}>
    <Title style={styles.title}>{title}</Title>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 80,
    marginBottom: -60
  },
  title: {
    fontSize: 27,
    color: 'white'
  }
});

export default Header;
