import React from 'react';
import Video from 'react-native-video';
import { Text } from 'react-native';

const Audio = ({ source }) => {
  if (source) {
    return (
      <Video
        source={{ uri: `http://192.168.1.102:8080/${source.id}` }}
        audioOnly={true}
        playInBackground={true}
      />
    );
  }

  return <Text>Test</Text>;
};

export default Audio;
