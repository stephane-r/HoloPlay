import * as React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import Spacer from '../Spacer';
import { Video as VideoTypes } from '../../types';
import { actions } from '../../store';

interface Props {
  videos: VideoTypes[];
  showRemoveButton?: boolean;
  onRemove: (videoIndexId: string) => void;
  onPlay: (videoIndex: number) => void;
  color?: null | string;
}

const DEFAULT_ICON_BUTTON_PROPS = (color: string) => ({
  size: 25,
  animated: true,
  accessibilityStates: [],
  style: {
    margin: 6,
    marginRight: color ? 0 : 6
  },
  color
});

const Video: React.FC<Props> = ({
  videos,
  onPlay,
  showRemoveButton = true,
  playingVideoId,
  paused,
  onRemove,
  color = null
}) => (
  <>
    {videos.map((video, index) => (
      <TouchableNativeFeedback onPress={() => onPlay(video.index || index)}>
        <View key={video.videoId} style={styles.container}>
          <View style={styles.line}>
            <Text
              accessibilityStates={[]}
              numberOfLines={1}
              style={{ width: '75%', flex: 1, color }}>
              {video.title}
            </Text>
            {playingVideoId === video.videoId ? (
              <IconButton
                icon={paused ? 'arrow-right-drop-circle' : 'pause-circle'}
                onPress={(): void => actions.paused()}
                {...DEFAULT_ICON_BUTTON_PROPS(color)}
              />
            ) : (
              <IconButton
                icon="play-circle-outline"
                {...DEFAULT_ICON_BUTTON_PROPS(color)}
              />
            )}
            {showRemoveButton && (
              <IconButton
                accessibilityStates={[]}
                icon="delete"
                size={20}
                style={{ margin: 0 }}
                onPress={(): void => onRemove(video.indexId ?? null)}
              />
            )}
          </View>
          {video.index + 1 < videos.length && (
            <View style={{ width: '100%', height: 1 }}>
              {color ? (
                <Divider
                  style={{ backgroundColor: color }}
                  accessibilityStates={[]}
                  color="black"
                />
              ) : (
                <Divider accessibilityStates={[]} color="black" />
              )}
            </View>
          )}
        </View>
      </TouchableNativeFeedback>
    ))}
    <View style={{ width: '100%' }}>
      <Spacer height={10} />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Video;
