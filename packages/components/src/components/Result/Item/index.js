// @flow
import React from 'react';
import { Text, Image, Button, View } from 'react-native';
import { actions } from '@youtube-audio-player/core';

type Props = {
  item: Object,
  index: number,
  onPress: Function,
  isFavoris: boolean
};

const ResultItem = ({ item, index, onPress, isFavoris }: Props) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
    <Text onPress={() => onPress(index)}>
      <Image
        source={{ uri: item.thumbnails.default.url }}
        style={{
          width: item.thumbnails.default.width,
          height: item.thumbnails.default.height
        }}
      />
      <Text>{item.title}</Text>
    </Text>
    {!isFavoris ? (
      <Button
        title="Add to my favoris"
        onPress={() => actions.addSourceToFavoris(item)}
      />
    ) : (
      <Button
        title="Remove to my favoris"
        color="#841584"
        onPress={() => actions.removeSourceFromFavoris(item)}
      />
    )}
  </View>
);

export default ResultItem;
