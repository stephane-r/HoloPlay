import React, { memo } from "react";
import {
  Animated,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useAnimation } from "react-native-animation-hooks";
import { IconButton, Text } from "react-native-paper";

import useKeyboard from "../../hooks/useKeyboard";
import { Video as VideoType } from "../../types";

interface Props {
  video: VideoType;
  paused: boolean;
  showPlayer: () => void;
}

const PLAYER_SMALL_HEIGHT = 60;
const WHITE_COLOR = "#FFFFFF";

const color = WHITE_COLOR;

export const PlayerSmall: React.FC<Props> = memo(
  ({ video, paused, background, onPress, onPause }) => {
    const [visible] = useKeyboard();
    const height = useAnimation({
      toValue: background !== WHITE_COLOR && !visible ? PLAYER_SMALL_HEIGHT : 0,
      type: "timing",
      useNativeDriver: false,
    });

    return (
      <Animated.View style={[styles.absoluteContainer, { height }]}>
        <TouchableNativeFeedback onPress={onPress}>
          <View
            style={[
              styles.container,
              {
                height: PLAYER_SMALL_HEIGHT,
                backgroundColor: background,
              },
            ]}
          >
            <IconButton
              icon={"chevron-up"}
              onPress={onPress}
              style={[styles.icon]}
              color={color}
              size={30}
              animated
            />
            <View style={styles.content}>
              <Text numberOfLines={1} style={{ color, textAlign: "center" }}>
                {video?.title}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.author, { color, textAlign: "center" }]}
              >
                {video?.author}
              </Text>
            </View>
            <IconButton
              icon={paused ? "arrow-right-drop-circle" : "pause-circle"}
              onPress={onPause}
              style={styles.icon}
              color={color}
              size={40}
              animated
            />
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  absoluteContainer: {
    position: "absolute",
    overflow: "hidden",
    right: 0,
    bottom: 54,
    left: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginTop: -2,
  },
  icon: {
    width: 40,
    margin: 0,
    marginTop: -2,
    marginHorizontal: 15,
  },
  author: {
    fontSize: 10,
  },
});
