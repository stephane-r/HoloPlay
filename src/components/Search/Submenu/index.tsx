import React, { useCallback, memo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  Text,
  TouchableRipple,
  useTheme
} from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';

interface Props {
  isOpen: boolean;
  selectValue: () => void;
  items: string[];
}

const SearchSubmenu: React.FC<Props> = memo(
  ({ isOpen, selectValue, items }) => {
    const { colors } = useTheme();
    const opacity = useAnimation({
      toValue: isOpen ? 1 : 0,
      type: 'timing',
      duration: 100,
      useNativeDriver: false
    });

    return (
      <Animated.View
        style={[
          styles.submenu,
          {
            backgroundColor: colors.surface,
            opacity,
            bottom: 74
          }
        ]}
        pointerEvents={isOpen ? 'auto' : 'none'}>
        {items.map((text, index) => (
          <Item
            key={`${text}-${index}`}
            text={text}
            index={index}
            selectValue={selectValue}
          />
        ))}
      </Animated.View>
    );
  }
);

const Item = memo(({ selectValue, text, index }) => {
  const onPress = useCallback(() => {}, []);
  const { dark } = useTheme();

  return (
    <TouchableRipple onPress={() => selectValue(text)}>
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
        <Text>{text}</Text>
      </View>
    </TouchableRipple>
  );
});

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
