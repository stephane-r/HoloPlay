// @flow
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SnapCarousel from 'react-native-snap-carousel';
import Card from '../Card/Layout';

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

type ItemProps = {
  item: Object,
  index: Number
};

const CarouselItem = ({ item }: ItemProps) => (
  <View style={styles.itemContainer}>
    <Card
      key={item.id}
      alignment="horizontal"
      card={{
        title: item.name,
        picture:
          item.sources.length === 0
            ? 'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png' // TODO: Replace placeholder ..
            : item.sources[0].thumbnails.default.url
      }}
      rightContent={
        <CarouselPlayIcon onPress={() => alert('play playlist')} />
      }>
      <Text>{item.sources.length} sound</Text>
    </Card>
  </View>
);

type CarouselProps = {
  data: Array<Object>
};

const Carousel = (props: CarouselProps) => {
  if (!props.data) {
    return null;
  }

  return (
    <SnapCarousel
      {...props}
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
