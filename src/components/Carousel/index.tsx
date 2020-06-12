import React, { memo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SnapCarousel from 'react-native-snap-carousel';
import Card from '../Card/Layout';
import { actions } from '../../store';
import { Playlist } from '../../types';

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
  item: any;
  index: number;
}

const setCardItem = (item: any): any => ({
  title: item.title,
  picture:
    item.videos && item.videos[0]
      ? item.videos[0].videoThumbnails[0].url
      : 'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png'
});

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  const sourceCount = item.videos ? item.videos.length : 0;

  const runPlaylist = async (): Promise<any> => {
    await actions.setPlaylistFrom(item.videos);
    actions.loadSource(0);
  };

  return (
    <View style={styles.itemContainer}>
      <Card
        key={item.playlistId}
        alignment="horizontal"
        card={setCardItem(item)}
        onPress={runPlaylist}
        rightContent={
          sourceCount !== '0' && <CarouselPlayIcon onPress={runPlaylist} />
        }>
        <Text accessibilityStates={[]}>
          {sourceCount} song
          {sourceCount > 1 && 's'}
        </Text>
      </Card>
    </View>
  );
};

interface CarouselProps {
  playlists: Playlist[];
}

const Carousel: React.FC<CarouselProps> = ({ playlists }) => (
  <SnapCarousel
    data={playlists}
    firstItem={playlists.length - 1}
    layout="tinder"
    itemWidth={Dimensions.get('window').width - 32}
    sliderWidth={Dimensions.get('window').width - 32}
    renderItem={CarouselItem}
  />
);

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 20
  }
});

export { CarouselPlayIcon, setCardItem };
export default memo(Carousel);
