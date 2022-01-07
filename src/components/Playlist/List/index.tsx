import React, { memo } from 'react';
import { View } from 'react-native';
import DataEmpty from '../../Data/Empty';
import { Playlist as PlaylistType } from '../../../types';
import { useTranslation } from 'react-i18next';
import { useAppSettings } from '../../../providers/App';
import { usePlaylist } from '../../../providers/Playlist';
import { CapsulePlaylist } from '../../CapsulePlaylist';
import { useMemo } from 'react';

export const PlaylistList: React.FC = memo(() => {
  const { t } = useTranslation();
  const { settings } = useAppSettings();
  const { state } = usePlaylist();

  if (state.playlists?.length === 0) {
    return <DataEmpty text={t('data.empty.playlist')} />;
  }

  const playlist: PlaylistType[] = useMemo(() =>
    state.playlists.filter((p: PlaylistType) => p.title !== 'favoris')
  );

  return (
    <View>
      {playlist.map(playlist => (
        <CapsulePlaylist
          playlist={playlist}
          logoutMode={settings.logoutMode}
          totalSongs={playlist.videos?.length ?? 0}
          playingVideoId={state.playingVideoId}
        />
      ))}
    </View>
  );
});
