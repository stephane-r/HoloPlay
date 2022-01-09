import React, { useMemo, memo } from 'react';
import DataEmpty from '../../Data/Empty';
import { Text, Button } from 'react-native-paper';
import Spacer from '../../Spacer';
import { useTranslation } from 'react-i18next';
import { useFavorite } from '../../../providers/Favorite';
import { CardList } from '../../CardList';

export const FavorisList: React.FC = memo(() => {
  const { state, favorite } = useFavorite();
  const { t } = useTranslation();

  const videos = useMemo(
    () => state.favorisPlaylist?.videos ?? null,
    [state.favorisPlaylist]
  );

  if (!videos) {
    return (
      <DataEmpty>
        <Text>{t('data.empty.favorisNotSet')}</Text>
        <Spacer height={20} />
        <Button
          onPress={() => favorite.init()}
          mode="contained">
          {t('data.empty.favorisButtonSet')}
        </Button>
      </DataEmpty>
    );
  }

  if (videos.length === 0) {
    return <DataEmpty text={t('data.empty.favoris')} />;
  }

  return <CardList data={videos} display="grid" setPlaylistFrom="favoris" />;
});
