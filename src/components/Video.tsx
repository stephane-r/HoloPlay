import React, { memo, useCallback, useState } from "react";
import { useEffect } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  ActivityIndicator,
  Divider,
  IconButton,
  Text,
} from "react-native-paper";

import { usePlayer } from "../providers/Player";
import { usePlaylist } from "../providers/Playlist";
import { Video as VideoTypes } from "../types";
import { Spacer } from "./Spacer";

interface Props {
  videos: VideoTypes[];
  showRemoveButton?: boolean;
  onRemove: (videoIndexId: string) => void;
  onPlay: (videoIndex: number) => void;
  color?: null | string;
}

export const VideoListDraggable: React.FC<Props> = memo(
  ({ playlist, videos, ...props }) => {
    const { playlist: playlistActions } = usePlaylist();
    const [list, setList] = useState(videos);

    useEffect(() => {
      setList(videos);
    }, [videos]);

    const handleDragEnd = (videosSorted: VideoTypes[]) => {
      setList(videosSorted);
      playlistActions.sortPlaylist({
        ...playlist,
        videosSorted,
      });
    };

    return (
      <>
        <DraggableFlatList
          data={list}
          renderItem={({ item, index, ...itemProps }) => (
            <Video
              key={item.videoId}
              item={item}
              index={index}
              isLast={index + 1 === videos.length}
              {...itemProps}
              {...props}
            />
          )}
          keyExtractor={(item) => `draggable-item-${item.videoId}`}
          onDragEnd={({ data }) => handleDragEnd(data)}
          {...props}
        />
        <View style={{ width: "100%" }}>
          <Spacer height={10} />
        </View>
      </>
    );
  }
);

export const VideoList: React.FC<Props> = memo(({ videos, ...props }) => {
  return (
    <>
      {videos.map((item, index) => (
        <Video
          item={item}
          index={index}
          isLast={index + 1 === videos.length}
          {...props}
        />
      ))}
      <View style={{ width: "100%" }}>
        <Spacer height={10} />
      </View>
    </>
  );
});

const Video = memo(
  ({
    item,
    canRemoveVideo,
    index,
    onPlay,
    onRemove,
    color,
    isLast,
    isActive,
    drag,
  }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { state: playerState } = usePlayer();

    const isPlaying = playerState.video?.videoId === item.videoId;

    const handlePress = useCallback(async (): Promise<any> => {
      setLoading(true);
      await onPlay(item.index || index);
      setLoading(false);
    }, [item.index, index, onPlay]);

    const handleRemove = useCallback(() => {
      onRemove(item.indexId ?? null);
    }, [item.indexId, onRemove]);

    return (
      <TouchableNativeFeedback onPress={handlePress} onLongPress={drag}>
        <View style={[styles.container, isActive && styles.isActive]}>
          <View style={styles.line}>
            {isPlaying ? (
              <IconButton icon="headset" size={18} style={{ marginLeft: 0 }} />
            ) : null}
            <Text numberOfLines={1} style={[styles.title, { color }]}>
              {item.title}
            </Text>
            {loading ? <VideoLoader color={color} /> : null}
            {canRemoveVideo && (
              <IconButton
                icon="delete"
                size={20}
                style={{ marginRight: 0 }}
                onPress={handleRemove}
              />
            )}
          </View>
          {!isLast && <VideoDivider color={color} />}
        </View>
      </TouchableNativeFeedback>
    );
  }
);

const VideoDivider = memo(({ color }) => {
  return (
    <View style={{ width: "100%", height: 1 }}>
      <Divider style={color ? { backgroundColor: color } : {}} />
    </View>
  );
});

const VideoLoader = memo(({ color }) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator color={color} size={20} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    width: "75%",
    flex: 1,
    paddingVertical: 8,
  },
  loader: {
    paddingHorizontal: 15,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  isActive: {
    opacity: 0.2,
  },
});
