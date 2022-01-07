import React, { useState, memo } from 'react';
import CardList from '../../Card/List';
import { Playlist, Video } from '../../../types';
import CardSearch from '../../Card/Search';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { FAVORIS_PLAYLIST_TITLE } from '../../../constants';
import DataEmpty from '../../Data/Empty';
import { Text, Button } from 'react-native-paper';
import Spacer from '../../Spacer';
import useFavoris from '../../../hooks/useFavoris';
import { useTranslation } from 'react-i18next';
import { useFavorite } from '../../../providers/Favorite';
import { Card } from '../../Card';
import { View } from 'react-native';

interface Props {
  videos: Video[];
  playlists?: null | Playlist[];
  favorisIds?: string[];
  isFavoris: boolean;
  setPlaylistFrom: string;
}

const ResultList: React.FC<Props> = memo(({ videos, ...props }) => {
  const { favorite } = useFavorite();
  const { t } = useTranslation();

  if (!videos) {
    return (
      <DataEmpty>
        <Text accessibilityStates={[]}>{t('data.empty.favorisNotSet')}</Text>
        <Spacer height={20} />
        <Button
          onPress={() => favorite.init()}
          mode="contained"
          theme="#EE05F2">
          {t('data.empty.favorisButtonSet')}
        </Button>
      </DataEmpty>
    );
  }

  if (videos.length === 0) {
    return <DataEmpty text={t('data.empty.favoris')} />;
  }

  return (
    <CardList>
      {videos.map((video, index) => (
        <View style={{ width: '50%' }}>
          <Card
            key={video.videoId}
            data={video}
            loopIndex={index}
            setPlaylistFrom={FAVORIS_PLAYLIST_TITLE}
          />
        </View>
      ))}
    </CardList>
  );
});

export default ResultList;
