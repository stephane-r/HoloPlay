import React, { memo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SearchbarContainer } from '../../../containers/Search/Bar';
import { useAnimation } from 'react-native-animation-hooks';
import useKeyboard from '../../../hooks/useKeyboard';

export const SearchbarAbsolute: React.FC = memo(() => {
  const [visible] = useKeyboard();
  const bottom = useAnimation({
    // toValue: visible || video === null ? 15 : 75,
    toValue: 15,
    type: 'timing',
    delay: 0,
    useNativeDriver: false
  });

  return (
    <Animated.View style={[styles.searchBarContainer, { bottom }]}>
      <SearchbarContainer />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    left: 15,
    right: 15
  }
});
