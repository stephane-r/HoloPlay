// @flow
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type DataEmptyProps = {
  text: string
};

const DataEmpty = ({ text }: DataEmptyProps) => (
  <View
    style={{
      backgroundColor: 'white',
      padding: 16,
      marginBottom: 20,
      elevation: 2,
      borderRadius: 4,
      paddingBottom: 50
    }}>
    <Text>{text}</Text>
  </View>
);

export default DataEmpty;
