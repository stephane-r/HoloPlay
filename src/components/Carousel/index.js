// @flow
import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SnapCarousel from 'react-native-snap-carousel';
import { useQuery } from 'react-apollo-hooks';
import Card from '../Card/Layout';
import GET_USER from '../../graphql/query/user';
import { actions } from '../../store';
import PlaceholderCarousel from '../Placeholder/Carousel';

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
  title: item.name,
  picture:
    item.sources && item.sources[0]
      ? item.sources[0].thumbnails.default.url
      : 'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png'
});

type CarouselProps = {
  userId: number
};

const CarouselItem = ({ item }: CarouselItemProps) => {
  const sourceCount = item.sources ? item.sources.length : 0;

  const runPlaylist = async () => {
    await actions.setPlaylistFrom(item.sources);
    actions.loadSource(0);
  };

  return (
    <View style={styles.itemContainer}>
      <Card
        key={item.id}
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

const Carousel = ({ userId }) => {
  const [isInit, setInit] = useState(false);
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      userId
    }
  });

  if (loading) {
    return <PlaceholderCarousel />;
  }

  return (
    <SnapCarousel
      data={data.user.playlists}
      firstItem={data.user.playlists.length - 1}
      layout="tinder"
      itemWidth={Dimensions.get('window').width - 32}
      sliderWidth={Dimensions.get('window').width - 32}
      renderItem={isInit ? CarouselItem : PlaceholderCarousel}
      onLayout={() => setTimeout(() => setInit(true), 200)}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 20
  }
});

export { CarouselPlayIcon, setCardItem };
export default React.memo<CarouselProps>(Carousel);
