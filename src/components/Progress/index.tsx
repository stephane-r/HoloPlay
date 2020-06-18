import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableNativeFeedback
} from 'react-native';
import hex2rgba from '../../utils/hex2rgba';

interface Props {
  height: number;
  color: string;
  progress: number;
}

const Progress: React.FC<Props> = ({ height = 2, color, progress }) => {
  const animation = useRef(new Animated.Value(0));
  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false
    }).start();
  }, [progress]);

  return (
    <View
      onTouchStart={(event) => console.log(event.nativeEvent)}
      style={{
        height: 20,
        paddingTop: 9
      }}>
      <View
        style={{
          height,
          backgroundColor: hex2rgba(color, 0.2),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Animated.View
          style={{
            height,
            backgroundColor: hex2rgba(color, 1),
            width
          }}
        />
        <View
          style={{
            width: 14,
            height: 14,
            backgroundColor: color,
            borderRadius: 14,
            transform: [
              {
                translateX: -5
              }
            ]
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  progress: {
    height: 10
  }
});

export default Progress;
