import React, { useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {
  Text,
  IconButton,
  Divider,
  ActivityIndicator
} from 'react-native-paper';
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

const Video: React.FC<Props> = ({ videos, ...props }) => (
  <>
    {videos.map((video, index) => (
      <Item
        video={video}
        index={index}
        isLast={index + 1 === videos.length}
        {...props}
      />
    ))}
    <View style={{ width: '100%' }}>
      <Spacer height={10} />
    </View>
  </>
);

const Item = ({
  video,
  index,
  onPlay,
  showRemoveButton = true,
  playingVideoId,
  paused,
  onRemove,
  color,
  isLast
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPress = async (): Promise<any> => {
    try {
      setLoading(true);
      await onPlay(video.index || index);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
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
              onPress={actions.paused}
              {...DEFAULT_ICON_BUTTON_PROPS(color)}
            />
          ) : loading ? (
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 8
              }}>
              <ActivityIndicator color={color} size={20} />
            </View>
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
        {!isLast && (
          <View style={{ width: '100%', height: 1 }}>
            {color ? (
              <Divider
                style={{ backgroundColor: color }}
                accessibilityStates={[]}
              />
            ) : (
              <Divider accessibilityStates={[]} />
            )}
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

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
