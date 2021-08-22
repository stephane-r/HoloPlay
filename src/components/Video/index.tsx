import React, { useCallback, useState } from 'react';
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

const Video: React.FC<Props> = ({ videos, ...props }) => {
  const Item = useCallback(
    ({
      item,
      index,
      onPlay,
      showRemoveButton = true,
      playingVideoId,
      paused,
      onRemove,
      color,
      isLast,
      drag,
      isActive
    }) => {
      const [loading, setLoading] = useState<boolean>(false);

      const onPress = async (): Promise<any> => {
        try {
          setLoading(true);
          await onPlay(item.index || index);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <TouchableNativeFeedback onPress={onPress} onLongPress={drag}>
          <View key={item.videoId} style={styles.container}>
            <View style={styles.line}>
              <Text
                numberOfLines={1}
                style={{
                  width: '75%',
                  flex: 1,
                  color
                }}>
                {item.title}
              </Text>
              {playingVideoId === item.videoId ? (
                <IconButton
                  icon={paused ? 'arrow-right-drop-circle' : 'pause-circle'}
                  onPress={actions.paused}
                  {...DEFAULT_ICON_BUTTON_PROPS(color)}
                />
              ) : loading ? (
                <View
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 15
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
                  onPress={(): void => onRemove(item.indexId ?? null)}
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
    },
    []
  );
  return (
    <>
      <DraggableFlatList
        data={videos}
        renderItem={({ item, index, ...itemProps }) => (
          <Item
            item={item}
            index={index}
            isLast={index + 1 === videos.length}
            {...itemProps}
            {...props}
          />
        )}
        keyExtractor={(item, index) => `draggable-item-${item.videoId}`}
        onDragEnd={({ data }) => console.log(data)}
        {...props}
      />
      <View style={{ width: '100%' }}>
        <Spacer height={10} />
      </View>
    </>
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
