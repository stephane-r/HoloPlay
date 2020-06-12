import React from 'react';
import { View } from 'react-native';
// @ts-ignore
import { Text } from 'react-native-paper';

interface Props {
  text: string;
}

const DataEmpty: React.FC<Props> = ({ text }) => (
  <View
    style={{
      backgroundColor: 'white',
      padding: 16,
      marginBottom: 20,
      elevation: 2,
      borderRadius: 4,
      paddingBottom: 50
    }}>
    <Text accessibilityStates={[]}>{text}</Text>
  </View>
);

export default DataEmpty;
