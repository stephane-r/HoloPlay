import React from 'react';
import { Animated, View, Dimensions, StyleSheet } from 'react-native';

const Overlay: React.FC = ({ opacity }) => (
  <Animated.View
    pointerEvents="none"
    style={[
      styles.overlay,
      {
        opacity
      }
    ]}
  />
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    height: Dimensions.get('window').height
  }
});

export default Overlay;
