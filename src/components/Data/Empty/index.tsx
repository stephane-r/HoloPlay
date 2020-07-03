import React from 'react';
import { View, StyleSheet } from 'react-native';
// @ts-ignore
import { Text } from 'react-native-paper';

interface Props {
  text: string;
}

const DataEmpty: React.FC<Props> = ({ text, children }) => (
  <View style={styles.container}>
    {text && <Text accessibilityStates={[]}>{text}</Text>}
    {children && children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    borderRadius: 4,
    paddingBottom: 50
  }
});

export default DataEmpty;
