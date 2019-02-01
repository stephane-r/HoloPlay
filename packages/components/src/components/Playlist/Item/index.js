import React from 'react';
import { Text, View, Button } from 'react-native';
import { actions } from '@youtube-audio-player/core';

const PlaylistItem = ({ id, name }) => (
  <View>
    <Text>{name}</Text>
    <Button
      title="Remove"
      onPress={() => actions.removePlaylist(id)} />
  </View>
);

export default PlaylistItem;
