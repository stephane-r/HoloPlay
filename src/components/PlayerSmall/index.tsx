import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  Animated
} from 'react-native';
import { Text, Headline, IconButton, Button } from 'react-native-paper';
import TimeFormat from 'hh-mm-ss';
import { getColorFromURL } from 'rn-dominant-color';
import LinearGradient from 'react-native-linear-gradient';
import { useAnimation } from 'react-native-animation-hooks';
import { actions } from '../../store';
import Spacer from '../Spacer';
import { Video as VideoType } from '../../types';
import Progress from '../Progress';
import hex2rgba from '../../utils/hex2rgba';
import useKeyboard from '../../hooks/useKeyboard';

interface Props {
  video: VideoType;
  paused: boolean;
  showPlayer: () => void;
}

const PLAYER_SMALL_HEIGHT = 60;
const WHITE_COLOR = '#FFFFFF';

const PlayerSmall: React.FC<Props> = ({ video, paused, showPlayer }) => {
  const [visible] = useKeyboard();
  const [color, setColor] = useState<string>(WHITE_COLOR);
  const [background, setBackground] = useState<string>(WHITE_COLOR);
  const bottom = useAnimation({
    toValue: background !== WHITE_COLOR && !visible ? PLAYER_SMALL_HEIGHT : 0,
    type: 'timing',
    useNativeDriver: false
  });

  getColorFromURL(video?.thumbnail.url).then((colors) =>
    setBackground(colors.primary)
  );

  useEffect(() => {}, [video]);

  return (
    <Animated.View
      style={[
        styles.absoluteContainer,
        {
          height: bottom
        }
      ]}>
      <TouchableNativeFeedback onPress={showPlayer}>
        <View
          style={[
            styles.container,
            {
              height: PLAYER_SMALL_HEIGHT,
              backgroundColor: background
            }
          ]}>
          <IconButton
            accessibilityStates={[]}
            icon={paused ? 'arrow-right-drop-circle' : 'pause-circle'}
            onPress={actions.paused}
            style={styles.icon}
            color={color}
            size={40}
            animated
          />
          <View style={styles.content}>
            <Text numberOfLines={1} style={{ color }}>
              {video?.title}
            </Text>
            <Text numberOfLines={1} style={[styles.author, { color }]}>
              {video?.author}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    overflow: 'hidden',
    right: 0,
    bottom: 54,
    left: 0
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: { flex: 1, paddingRight: 20, marginTop: -2 },
  icon: {
    width: 40,
    margin: 0,
    marginTop: -2,
    marginHorizontal: 20
  },
  author: {
    fontSize: 10
  }
});

export default PlayerSmall;
