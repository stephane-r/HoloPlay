import React, { memo } from 'react';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../types';
import { Text, Title } from 'react-native-paper';
import { View } from 'react-native';
import { ScrollView } from '../Card/ScrollList';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card';
import { useAppSettings } from '../../providers/App';

export const LastPlays: React.FC<Props> = memo(() => {
  const { t } = useTranslation();
  const { settings } = useAppSettings();

  // TODO: add set playlistFrom

  if (!settings.lastPlays || settings.lastPlays.length === 0) {
    return null;
  }

  return (
    <>
      <Title style={{ fontSize: 27 }}>{t('search.lastPlays')}</Title>
      <ScrollView>
        {settings.lastPlays.map((video, index) => (
          <View style={{ width: 250, paddingTop: 16 }}>
            <Card
              key={`last-plays-${video.videoId}-${index}`}
              loopIndex={index}
              data={video}
              setPlaylistFrom="lastPlays"
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
});
