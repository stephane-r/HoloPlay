import React from 'react';
import { Text, Image, Button } from 'react-native';
import { actions } from '@youtube-audio-player/core';

const ResultItem = ({ item, index, onPress }) => (
  <Text onPress={() => onPress(index)}>
    <Image
      source={{ uri: item.thumbnails.default.url }}
      style={{
        width: item.thumbnails.default.width,
        height: item.thumbnails.default.height
      }}
    />
    <Text>{item.title}</Text>
    <Button
      title="Add to my favoris"
      onPress={() => actions.addSourceToFavoris(item)}
    />
  </Text>
);

export default ResultItem;
