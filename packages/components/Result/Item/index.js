import React from 'react';
import { actions } from '@youtube-audio-player/core';
import { Text, Image } from 'react-native';

const ResultItem = ({ item, index }) => (
  <Text onPress={() => actions.loadSource(index)}>
    <Image
      source={{ uri: item.thumbnails.default.url }}
      style={{
        width: item.thumbnails.default.width,
        height: item.thumbnails.default.height
      }}
    />
    <Text>{item.title}</Text>
  </Text>
);

export default ResultItem;
