import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

const Layout = ({ children }) => (
  <ScrollView>
    <View style={styles.container}>{children}</View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f6f9',
    paddingHorizontal: 16
  }
});

export default Layout;
