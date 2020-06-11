// @flow
import React, { memo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SnapCarousel from 'react-native-snap-carousel';
import Card from '../Card/Layout';
import { actions } from '../../store';

type PlayIconProps = {
  onPress?: Function
};

const CarouselPlayIcon = ({ onPress }: PlayIconProps) => (
  <IconButton
    icon="play-circle-outline"
    size={35}
    style={{
      width: 40,
      marginRight: -5
    }}
    onPress={onPress}
  />
);

type CarouselItemProps = {
  item: Object,
  index: Number
};

const setCardItem = (item: Object) => ({
  title: item.title,
  picture:
    item.videos && item.videos[0]
      ? item.videos[0].videoThumbnails[0].url
      : 'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png'
});

const CarouselItem = ({ item }: CarouselItemProps) => {
  const sourceCount = item.videos ? item.videos.length : 0;

  const runPlaylist = async () => {
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
        <Text>
          {sourceCount} song
          {sourceCount > 1 && 's'}
        </Text>
      </Card>
    </View>
  );
};

const Carousel = ({ playlists }) => (
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
