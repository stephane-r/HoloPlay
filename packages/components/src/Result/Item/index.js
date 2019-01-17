import React from 'react';
import { Text, Image } from 'react-native-web';

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
  </Text>
);

export default ResultItem;
