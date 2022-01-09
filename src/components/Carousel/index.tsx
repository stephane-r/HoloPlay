import React, { memo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SnapCarousel from 'react-native-snap-carousel';
import Card from '../Card/Layout';
import { actions } from '../../store';
import { Playlist } from '../../types';
import Spacer from '../Spacer';
import { useTranslation } from 'react-i18next';
import { usePlaylist } from '../../providers/Playlist';
import { Capsule, CapsuleTotalSongs } from '../Capsule';
import { useCallback } from 'react';
import { PlaylistActions } from '../CapsulePlaylist';

interface CarouselPlayIconProps {
  onPress: () => void;
}

export const CarouselPlayIcon: React.FC<CarouselPlayIconProps> = memo(
  ({ onPress }) => {
    return (
      <IconButton
        icon="play-circle-outline"
        size={35}
        style={{
          width: 40,
          marginRight: 16
        }}
        onPress={onPress}
      />
    );
  }
);

interface CarouselItemProps {
  item: Playlist;
  index: number;
}

export const setCardItem = (item: any): any => ({
  title: item?.title,
  picture:
    item?.videos[0]?.videoThumbnails[0]?.url ??
    'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png'
});

const CarouselItem: React.FC<CarouselItemProps> = memo(({ item, t }) => {
  const videosCount = item.videos?.length ?? 0;

  const runPlaylist = useCallback(
    async (): Promise<void> =>
      actions.loadVideo({ videoIndex: 0, setPlaylistFrom: item.videos }),
    [item]
  );

  const handlePress = useCallback(() => {
    runPlaylist();
  }, [runPlaylist]);

  const handlePlay = useCallback(() => {
    if (!videosCount) {
      return null;
    }

    runPlaylist();
  }, [videosCount, runPlaylist]);

  return (
    <View style={styles.itemContainer}>
      <Capsule data={setCardItem(item)} onPress={runPlaylist}>
        <CapsuleTotalSongs totalSongs={videosCount} />
        <PlaylistActions>
          <CarouselPlayIcon onPress={handlePlay} />
        </PlaylistActions>
      </Capsule>
    </View>
  );
});

export const CarouselPlaylists: React.FC = memo(() => {
  const { t } = useTranslation();
  const { state } = usePlaylist();

  const playlists = state.playlists.filter(p => p.title !== 'favoris');

  if (!playlists.length) {
    return null;
  }

  return (
    <View style={{ marginBottom: -60 }}>
      <SnapCarousel
        data={playlists}
        firstItem={playlists.length - 1}
        layout="tinder"
        itemWidth={Dimensions.get('window').width - 32}
        sliderWidth={Dimensions.get('window').width - 32}
        renderItem={({ item }) => <CarouselItem item={item} t={t} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 20
  }
});
