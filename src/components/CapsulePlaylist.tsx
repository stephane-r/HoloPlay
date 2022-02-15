import React, { memo, useCallback, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useAppSettings } from "../providers/App";
import { usePlaylist } from "../providers/Playlist";
import { useVideo } from "../providers/Video";
import { Capsule, CapsuleTotalSongs } from "./Capsule";
import { formatCardItem } from "./Carousel";
import { DialogEditPlaylist } from "./Dialog/EditPlaylist";
import { DialogRemovePlaylist } from "./Dialog/RemovePlaylist";
import { IconButtonPlay } from "./IconButtonPlay";
import { PlaylistMenu } from "./PlaylistMenu";
import { Spacer } from "./Spacer";
import { VideoList, VideoListDraggable } from "./Video";

interface Props {
  totalSongs: number;
}

export const CapsulePlaylist: React.FC<Props> = memo(
  ({ totalSongs, playlist }) => {
    const [videoListVisible, setVideoListVisible] = useState(false);
    const { playlist: playlistActions } = usePlaylist();
    const { video } = useVideo();
    const { colors } = useTheme();
    const { settings } = useAppSettings();

    const card = formatCardItem(playlist);

    const handlePress = useCallback(() => {
      if (playlist.videos.length === 0) {
        return null;
      }
      setVideoListVisible(!videoListVisible);
    }, [playlist.videos.length, videoListVisible]);

    const handleLoadVideo = useCallback(
      async (videoIndex: number) => {
        if (videoIndex !== null || videoIndex !== undefined) {
          await video.loadVideo({
            videoIndex,
            setPlaylistFrom: playlist.videos,
          });
        }
      },
      [video, playlist.videos]
    );

    const handleRemoveVideo = useCallback(
      (videoIndexId: string) => {
        playlistActions.removeVideo({
          videoIndexId,
          playlistId: playlist.playlistId,
        });
      },
      [playlistActions, playlist]
    );

    return (
      <>
        <Capsule data={card} onPress={handlePress}>
          <CapsuleTotalSongs totalSongs={totalSongs} />
          <PlaylistActions>
            <ButtonPlayPlaylist playlist={playlist} />
            <PlaylistMenuContainer playlist={playlist} />
          </PlaylistActions>
          {videoListVisible ? (
            settings.logoutMode ? (
              <VideoListDraggable
                playlist={playlist}
                videos={playlist.videos}
                color={colors.text}
                onPlay={handleLoadVideo}
                onRemove={handleRemoveVideo}
                playlistId={playlist.playlistId}
                canRemoveVideo
              />
            ) : (
              <VideoList
                playlist={playlist}
                videos={playlist.videos}
                color={colors.text}
                onPlay={handleLoadVideo}
                onRemove={handleRemoveVideo}
                canRemoveVideo
              />
            )
          ) : null}
        </Capsule>
        <Spacer height={10} />
      </>
    );
  }
);

export const PlaylistActions = ({ children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: -30,
      }}
    >
      {children}
    </View>
  );
};

const PlaylistMenuContainer = memo(({ playlist }) => {
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [removeDialogVisible, setRemoveDialogVisible] = useState(false);

  const toggleEditDialog = useCallback(() => {
    setEditDialogVisible(!editDialogVisible);
  }, [setEditDialogVisible, editDialogVisible]);

  const toggleDialogRemove = useCallback(
    () => setRemoveDialogVisible(!removeDialogVisible),
    [setRemoveDialogVisible, removeDialogVisible]
  );

  return (
    <>
      <PlaylistMenu onEdit={toggleEditDialog} onRemove={toggleDialogRemove} />
      <DialogEditPlaylist
        visible={editDialogVisible}
        toggleDialog={toggleEditDialog}
        playlist={playlist}
      />
      <DialogRemovePlaylist
        visible={removeDialogVisible}
        toggleDialog={toggleDialogRemove}
        playlist={playlist}
      />
    </>
  );
});

export const ButtonPlayPlaylist = memo(({ playlist }) => {
  const [disabled, setDisabled] = useState(false);
  const { video } = useVideo();

  const handlePress = async () => {
    setDisabled(true);
    await video.loadVideo({
      videoIndex: 0,
      setPlaylistFrom: playlist.videos,
    });
    setDisabled(false);
  };

  if (!playlist.videos) {
    return null;
  }

  return <IconButtonPlay onPress={handlePress} disabled={disabled} />;
});
