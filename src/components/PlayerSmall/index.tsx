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
import useFavoris from '../../hooks/useFavoris';
import FavorisButtonContainer from '../../containers/Favoris/Button';

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
  const { addToFavoris, removeFromFavoris } = useFavoris();

  getColorFromURL(video?.thumbnail.url).then((colors) =>
    setBackground(colors.primary)
  );

  useEffect(() => {}, [video]);

  if (!video) {
    return null;
  }

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
            icon={'chevron-up'}
            onPress={showPlayer}
            style={[styles.icon]}
            color={color}
            size={30}
            animated
          />
          <View style={styles.content}>
            <Text numberOfLines={1} style={{ color, textAlign: 'center' }}>
              {video?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.author, { color, textAlign: 'center' }]}>
              {video?.author}
            </Text>
          </View>
          <IconButton
            accessibilityStates={[]}
            icon={paused ? 'arrow-right-drop-circle' : 'pause-circle'}
            onPress={actions.paused}
            style={styles.icon}
            color={color}
            size={40}
            animated
          />
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
  content: {
    flex: 1,
    marginTop: -2
  },
  icon: {
    width: 40,
    margin: 0,
    marginTop: -2,
    marginHorizontal: 15
  },
  author: {
    fontSize: 10
  }
});

export default PlayerSmall;
