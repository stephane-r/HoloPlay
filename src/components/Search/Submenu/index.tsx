import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  Searchbar,
  Text,
  TouchableRipple,
  IconButton,
  useTheme
} from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';
import { actions } from '../../../store';

interface Props {
  isOpen: boolean;
  selectValue: () => void;
  items: string[];
}

const SearchSubmenu: React.FC<Props> = ({ isOpen, selectValue, items }) => {
  const { colors } = useTheme();
  const opacity = useAnimation({
    toValue: isOpen ? 1 : 0,
    type: 'timing',
    duration: 100,
    useNativeDriver: false
  });

  return (
    <Animated.View
      style={[styles.submenu, { backgroundColor: colors.surface, opacity }]}
      pointerEvents={isOpen ? 'auto' : 'none'}>
      {items.map((text, index) => (
        <TouchableRipple key={index} onPress={() => selectValue(text)}>
          <View
            style={[
              styles.item,
              {
                borderTopColor: colors.placeholder,
                borderTopWidth: index === 0 ? 0 : 1
              }
            ]}>
            <Text accessibilityStates={[]}>{text}</Text>
          </View>
        </TouchableRipple>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  submenu: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    elevation: 2,
    zIndex: 2,
    borderRadius: 4
  },
  item: {
    padding: 7
  }
});

export default SearchSubmenu;
