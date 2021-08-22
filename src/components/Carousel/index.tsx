import React, { memo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SnapCarousel from 'react-native-snap-carousel';
import Card from '../Card/Layout';
import { actions } from '../../store';
import { Playlist } from '../../types';
import Spacer from '../Spacer';
import { useTranslation } from 'react-i18next';

type CarouselPlayIconProps = {
  onPress?: () => void;
};

const CarouselPlayIcon: React.FC<CarouselPlayIconProps> = ({ onPress }) => (
  <IconButton
    accessibilityStates={[]}
    icon="play-circle-outline"
    size={35}
    style={{
      width: 40,
      marginRight: -5
    }}
    onPress={onPress}
  />
);

interface CarouselItemProps {
  item: Playlist;
  index: number;
}

const setCardItem = (item: any): any => ({
  title: item.title,
  picture:
    item.videos[0]?.videoThumbnails[0]?.url ??
    'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png'
});

const CarouselItem: React.FC<CarouselItemProps> = ({ item, t }) => {
  const videosCount = item.videos?.length ?? 0;

  const runPlaylist = async (): Promise<void> =>
    actions.loadVideo({ videoIndex: 0, setPlaylistFrom: item.videos });

  return (
    <View style={styles.itemContainer}>
      <Card
        key={item.playlistId}
        alignment="horizontal"
        card={setCardItem(item)}
        onPress={runPlaylist}
        rightContent={
          <CarouselPlayIcon
            onPress={(): null | void =>
              videosCount > 0 ? runPlaylist() : null
            }
          />
        }>
        <Text accessibilityStates={[]}>
          {videosCount} {t('playlists.song')}
          {videosCount > 1 && 's'}
        </Text>
      </Card>
    </View>
  );
};

interface CarouselProps {
  playlists: Playlist[];
}

const Carousel: React.FC<CarouselProps> = ({ playlists }) => {
  const { t } = useTranslation();

  return (
    <View style={{ marginBottom: playlists.length === 0 ? 0 : -60 }}>
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
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 20
  }
});

export { CarouselPlayIcon, setCardItem };
export default memo(Carousel);
