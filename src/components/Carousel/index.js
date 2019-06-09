// @flow
import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import SnapCarousel from 'react-native-snap-carousel';
import Card from '../Card/Layout';
import Text from '../Text';
import Icon from '../Icon';

type PlayIconProps = {
  onPress: Function
};

const CarouselPlayIcon = ({ onPress }: PlayIconProps) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      name="Play"
      width={30}
      heigh={30} />
  </TouchableOpacity>
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
        picture: 'https://picsum.photos/200/100'
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

const Carousel = ({ data }: CarouselProps) => (
  <SnapCarousel
    layout="tinder"
    loop
    data={data}
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

export { CarouselPlayIcon };
export default Carousel;
