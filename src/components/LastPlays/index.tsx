import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from 'react-native-paper';
import { useData } from '../../providers/Data';
import { usePlaylist } from '../../providers/Playlist';
import { CardList } from '../CardList';
import Spacer from '../Spacer';

export const LastPlays: React.FC = memo(() => {
  const { t } = useTranslation();
  const { state: dataState } = useData();
  const { state: playlistState } = usePlaylist();

  const spacer = useMemo(() => {
    const playlist = playlistState.playlists.filter(p => p.title !== 'favoris');
    return playlist.length ? 90 : 30;
  }, [playlistState.playlists]);

  if (!dataState.lastPlays || dataState.lastPlays.length === 0) {
    return null;
  }

  return (
    <>
      <Spacer height={spacer} />
      <Title style={{ fontSize: 27 }}>{t('search.lastPlays')}</Title>
      <CardList data={dataState.lastPlays} setPlaylistFrom="lastPlays" />
    </>
  );
});
