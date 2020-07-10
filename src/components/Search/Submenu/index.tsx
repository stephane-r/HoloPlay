import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  Searchbar,
  Text,
  TouchableRipple,
  IconButton
} from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';
import { actions } from '../../../store';

interface Props {
  isOpen: boolean;
  selectValue: () => void;
  items: string[];
}

const SearchSubmenu: React.FC<Props> = ({ isOpen, selectValue, items }) => {
  const opacity = useAnimation({
    toValue: isOpen ? 1 : 0,
    type: 'timing',
    duration: 100,
    useNativeDriver: false
  });

  return (
    <Animated.View
      style={[styles.submenu, { opacity }]}
      pointerEvents={isOpen ? 'auto' : 'none'}>
      {items.map((text, index) => (
        <TouchableRipple key={index} onPress={() => selectValue(text)}>
          <View
            style={[
              styles.item,
              {
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
    backgroundColor: 'white',
    zIndex: 2,
    borderRadius: 4
  },
  item: {
    borderTopColor: '#bdc3c7',
    padding: 7
  }
});

export default SearchSubmenu;
