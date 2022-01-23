import React, { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { actions } from '../store';
import Spacer from './Spacer';
import { CarouselPlayIcon, setCardItem } from './Carousel';
import { VideoList, VideoListDraggable } from './Video';
import { DialogRemovePlaylist } from './Dialog/RemovePlaylist';
import { PlaylistMenu } from './Playlist/Menu';
import { Playlist } from '../../types';
import { DialogEditPlaylist } from './Dialog/EditPlaylist';
import { usePlaylist } from '../providers/Playlist';
import { Capsule, CapsuleTotalSongs } from './Capsule';
import { usePlayer } from '../providers/Player';
import { useAppSettings } from '../providers/App';

interface Props {
  totalSongs: number;
  playlist: Playlist;
}

export const CapsulePlaylist: React.FC<Props> = memo(
  ({ totalSongs, playlist }) => {
    const [videoListVisible, setVideoListVisible] = useState(false);
    const { playlist: playlistActions } = usePlaylist();
    const { player } = usePlayer();
    const { colors } = useTheme();
    const { settings } = useAppSettings();

    const card = setCardItem(playlist);

    const handlePress = useCallback(() => {
      if (playlist.videos.length === 0) {
        return null;
      }
      setVideoListVisible(!videoListVisible);
    }, [playlist.videos.length, videoListVisible]);

    const handleLoadVideo = useCallback(
      async (videoIndex: number) => {
        if (videoIndex !== null || videoIndex !== undefined) {
          await player.loadVideo({
            videoIndex,
            setPlaylistFrom: playlist.videos
          });
        }
      },
      [player, playlist.videos]
    );

    const handleRemoveVideo = useCallback(
      (videoIndexId: string) => {
        playlistActions.removeVideo({
          videoIndexId,
          playlistId: playlist.playlistId
        });
      },
      [playlistActions, playlist]
    );

    return (
      <>
        <Capsule data={card} onPress={handlePress}>
          <CapsuleTotalSongs totalSongs={totalSongs} />
          <PlaylistActions>
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: -30
      }}>
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

const ButtonPlayPlaylist = memo(({ playlist }) => {
  if (!playlist.videos) {
    return null;
  }

  return (
    <CarouselPlayIcon
      onPress={async () => {
        actions.loadVideo({
          videoIndex: 0,
          setPlaylistFrom: playlist.videos
        });
      }}
    />
  );
});
