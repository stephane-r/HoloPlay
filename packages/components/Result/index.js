import React from 'react';

const { Text, Image } = require('react-native');

const Result = ({ results }) => {
  if (results.length > 0) {
    return results.map((item, index) => (
      <Text key={index}>
        <Image
          source={{ uri: item.thumbnails.default.url }}
          style={{
            width: item.thumbnails.default.width,
            height: item.thumbnails.default.height
          }}
        />
        <Text>{item.title}</Text>
      </Text>
    ));
  } else {
    return <Text>Aucun résultat</Text>;
  }
};

export default Result;
