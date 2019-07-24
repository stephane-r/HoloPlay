// @flow
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SnapCarousel from 'react-native-snap-carousel';
import { useQuery } from 'react-apollo-hooks';
import Card from '../Card/Layout';
import GET_USER_PLAYIST from '../../graphql/query/playlist';

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

const CarouselItem = ({ item }: CarouselItemProps) => (
  <View style={styles.itemContainer}>
    <Card
      key={item.id}
      alignment="horizontal"
      card={{
        title: item.name,
        picture:
          'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png'
        // item.sources.length === 0
        // ? 'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png' // TODO: Replace placeholder ..
        // : item.sources[0].thumbnails.default.url
      }}
      rightContent={
        <CarouselPlayIcon onPress={() => alert('play playlist')} />
      }>
      {/* <Text>{item.sources.length} sound</Text> */}
      <Text>0 sound</Text>
    </Card>
  </View>
);

const Carousel = ({ userId }) => {
  const { data, error, loading } = useQuery(GET_USER_PLAYIST, {
    variables: {
      userId
    }
  });

  if (loading || error) {
    return null;
  }

  return (
    <SnapCarousel
      data={data.user.playlists}
      firstItem={data.user.playlists.length - 1}
      layout="tinder"
      itemWidth={Dimensions.get('window').width - 32}
      sliderWidth={Dimensions.get('window').width - 32}
      renderItem={CarouselItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 20
  }
});

export { CarouselPlayIcon };
export default Carousel;
