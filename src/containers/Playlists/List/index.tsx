import React, { memo } from 'react';
import { PlaylistList } from '../../../components/Playlist/List';
import { useAppSettings } from '../../../providers/App';
import { usePlaylist } from '../../../providers/Playlist';

export const PlaylistsContainer = memo(props => {
  const { state } = usePlaylist();
  const { settings } = useAppSettings();

  return (
    <PlaylistList
      playlists={state.playlists.filter(p => p.title !== 'favoris')}
      playingVideoId={null}
      logoutMode={settings.logoutMode}
      {...props}
    />
  );
});
