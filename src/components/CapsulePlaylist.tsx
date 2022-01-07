import React, { memo, useState } from 'react';
import { View, Alert } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Card from './Layout';
import { actions } from '../store';
import Spacer from './Spacer';
import { CarouselPlayIcon, setCardItem } from './Carousel';
import { VideoList } from './Video';
import { DialogRemovePlaylist } from './Dialog/RemovePlaylist';
import { PlaylistMenu } from './Playlist/Menu';
import callApi from '../../utils/callApi';
import { ApiRoutes } from '../../constants';
import { Playlist, Video as VideoType } from '../../types';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { DialogEditPlaylist } from './Dialog/EditPlaylist';
import { usePlaylist } from '../providers/Playlist';
import { Capsule, CapsuleTotalSongs } from './Capsule';

interface Props {
  totalSongs: number;
  playlist: Playlist;
  playingVideoId: string;
  toggleModal: (playlist: Playlist) => void;
}

export const CapsulePlaylist: React.FC<Props> = memo(
  ({ totalSongs, playlist, playingVideoId, toggleModal, logoutMode }) => {
    const [videoListVisible, setVideoListVisible] = useState(false);
    const { playlist: playlistActions } = usePlaylist();
    const { colors } = useTheme();

    const toggleItems = useCallback(
      () => setVideoListVisible(!videoListVisible),
      [setVideoListVisible, videoListVisible]
    );

    const card = setCardItem(playlist);

    const handlePress = useCallback(() => {
      if (playlist.videos.length === 0) {
        return null;
      }

      setVideoListVisible(!videoListVisible);
    }, [playlist, toggleItems]);

    const handlePlay = useCallback(
      async (videoIndex: number) => {
        if (videoIndex !== null || videoIndex !== undefined) {
          try {
            await actions.loadVideo({
              videoIndex,
              setPlaylistFrom: playlist.videos
            });
          } catch (error) {
            actions.setSnackbar({
              message: t('snackbar.canNotLoadVideo')
            });
          }
        }
      },
      [playlist]
    );

    const handleRemove = useCallback(
      (videoIndexId: string) => {
        playlistActions.removeVideo({
          videoIndexId,
          playlistId: playlist.playlistId
        });
      },
      [playlistActions, playlist]
    );

    const handleDragEnd = useCallback(
      (videos: VideoType[]) => {
        if (!logoutMode) {
          return actions.setSnackbar({
            message: t('playlists.canNotReOrder')
          });
        }

        actions.sortPlaylist({
          ...playlist,
          videos
        });
      },
      [logoutMode, playlist]
    );

    return (
      <>
        <Capsule data={card} onPress={handlePress}>
          <CapsuleTotalSongs totalSongs={totalSongs} />
          <PlaylistActions>
            <PlaylistMenuContainer playlist={playlist} />
          </PlaylistActions>
          {videoListVisible ? (
            <VideoList
              videos={playlist.videos}
              color={colors.text}
              onPlay={handlePlay}
              onRemove={handleRemove}
              onDragEnd={handleDragEnd}
              playlistId={playlist.playlistId}
              playingVideoId={playingVideoId}
              canRemoveVideo
            />
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
