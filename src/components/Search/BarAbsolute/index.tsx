import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SearchbarContainer from '../../../containers/Search/Bar';
import { useAnimation } from 'react-native-animation-hooks';
import useKeyboard from '../../../hooks/useKeyboard';

const SearchbarAbsolute: React.FC = ({ video }) => {
  const [visible] = useKeyboard();
  const bottom = useAnimation({
    toValue: visible || video === null ? 15 : 75,
    type: 'timing',
    delay: 0,
    useNativeDriver: false
  });

  return (
    <Animated.View style={[styles.searchBarContainer, { bottom }]}>
      <SearchbarContainer showButtonHistory submenuPosition="bottom" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    left: 15,
    right: 15
  }
});

export default SearchbarAbsolute;
