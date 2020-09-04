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
  position?: 'top' | 'bottom';
}

const SearchSubmenu: React.FC<Props> = ({
  isOpen,
  selectValue,
  items,
  position = 'top'
}) => {
  const { colors, dark } = useTheme();
  const opacity = useAnimation({
    toValue: isOpen ? 1 : 0,
    type: 'timing',
    duration: 100,
    useNativeDriver: false
  });

  const isBottomPosition = position === 'bottom';

  return (
    <Animated.View
      style={[
        styles.submenu,
        {
          backgroundColor: colors.surface,
          opacity,
          [position]: isBottomPosition ? 62 : 70
        }
      ]}
      pointerEvents={isOpen ? 'auto' : 'none'}>
      {items.map((text, index) => (
        <TouchableRipple key={index} onPress={() => selectValue(text)}>
          <View
            style={[
              styles.item,
              {
                borderTopColor: dark
                  ? 'rgba(255, 255, 255, .1)'
                  : 'rgba(0, 0, 0, .2)',
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
