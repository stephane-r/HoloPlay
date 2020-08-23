import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const SearchValue: React.FC = ({ value, resultCount }) => {
  if ((value === null) | (value === '')) {
    return null;
  }

  return (
    <Text style={styles.text}>
      {value} ({resultCount})
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white'
  }
});

export default SearchValue;
