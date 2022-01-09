import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import DataEmpty from '../../Data/Empty';
import { Playlist as PlaylistType } from '../../../types';
import { useTranslation } from 'react-i18next';
import { useAppSettings } from '../../../providers/App';
import { usePlaylist } from '../../../providers/Playlist';
import { CapsulePlaylist } from '../../CapsulePlaylist';

export const PlaylistList: React.FC = memo(() => {
  const { t } = useTranslation();
  const { settings } = useAppSettings();
  const { state } = usePlaylist();

  const playlists: PlaylistType[] = useMemo(
    () => state.playlists.filter((p: PlaylistType) => p.title !== 'favoris'),
    [state.playlists]
  );

  if (playlists?.length === 0) {
    return <DataEmpty text={t('data.empty.playlist')} />;
  }

  return (
    <View>
      {playlists.map(playlist => (
        <CapsulePlaylist
          key={playlist.id}
          playlist={playlist}
          logoutMode={settings.logoutMode}
          totalSongs={playlist.videos?.length ?? 0}
          playingVideoId={state.playingVideoId}
        />
      ))}
    </View>
  );
});
