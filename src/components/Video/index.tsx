import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {
  Text,
  IconButton,
  Divider,
  ActivityIndicator
} from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Spacer from '../Spacer';
import { Video as VideoTypes } from '../../types';
import { actions } from '../../store';
import { useMemo } from 'react';

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

export const VideoList: React.FC<Props> = memo(
  ({ videos, onDragEnd, ...props }) => {
    return (
      <>
        <DraggableFlatList
          data={videos}
          renderItem={({ item, index, ...itemProps }) => (
            <Video
              item={item}
              index={index}
              isLast={index + 1 === videos.length}
              {...itemProps}
              {...props}
            />
          )}
          keyExtractor={(item, index) => `draggable-item-${item.videoId}`}
          onDragEnd={({ data }) => onDragEnd(data)}
          {...props}
        />
        <View style={{ width: '100%' }}>
          <Spacer height={10} />
        </View>
      </>
    );
  }
);

const Video = memo(
  ({
    item,
    canRemoveVideo,
    index,
    onPlay,
    playingVideoId,
    paused,
    onRemove,
    color,
    isLast,
    drag,
    isActive
  }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handlePress = useCallback(async (): Promise<any> => {
      setLoading(true);
      await onPlay(item.index || index);
      setLoading(false);
    }, [item.index, index, onPlay]);

    const handleRemove = useCallback(() => {
      onRemove(item.indexId ?? null);
    }, [item.indexId, onRemove]);

    const isCurrentPlaying = useMemo(
      () => playingVideoId === item.videoId,
      [item.videoId, playingVideoId]
    );

    return (
      <TouchableNativeFeedback onPress={handlePress} onLongPress={drag}>
        <View
          key={item.videoId}
          style={[styles.container, isActive && styles.isActive]}>
          <View style={styles.line}>
            <Text numberOfLines={1} style={[styles.title, { color }]}>
              {item.title}
            </Text>
            {isCurrentPlaying ? (
              <IconButton
                icon={paused ? 'arrow-right-drop-circle' : 'pause-circle'}
                onPress={actions.paused}
                {...DEFAULT_ICON_BUTTON_PROPS(color)}
              />
            ) : loading ? (
              <VideoLoader color={color} />
            ) : (
              <IconButton
                icon="play-circle-outline"
                {...DEFAULT_ICON_BUTTON_PROPS(color)}
              />
            )}
            {canRemoveVideo && (
              <IconButton
                icon="delete"
                size={20}
                style={{ marginRight: 0 }}
                onPress={handleRemove}
              />
            )}
          </View>
          {!isLast && (
            <View style={{ width: '100%', height: 1 }}>
              <Divider style={color ? { backgroundColor: color } : {}} />
            </View>
          )}
        </View>
      </TouchableNativeFeedback>
    );
  }
);

const VideoLoader = memo(({ color }) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator color={color} size={20} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  title: {
    width: '75%',
    flex: 1
  },
  loader: {
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  isActive: {
    opacity: 0.2
  }
});
