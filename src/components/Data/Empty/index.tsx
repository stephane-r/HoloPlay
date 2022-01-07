import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface Props {
  text: string;
}

const DataEmpty: React.FC<Props> = ({ text, children }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background
        }
      ]}>
      {text ? <Text accessibilityStates={[]}>{text}</Text> : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    borderRadius: 4,
    minHeight: 80
  }
});

export default DataEmpty;
