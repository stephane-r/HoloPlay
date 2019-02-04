import React from 'react';
import { Text, View, Button } from 'react-native';
import { actions } from '@youtube-audio-player/core';

const PlaylistItem = ({ playlist, toggleModal }) => (
  <View>
    <Text>{playlist.name}</Text>
    {playlist.sources.map(item => (
      <Text key={item.id}>{item.title}</Text>
    ))}
    <Button
      title="Remove"
      onPress={() => actions.removePlaylist(playlist.id)}
    />
    <Button
      title="Edit"
      onPress={() => toggleModal(playlist)} />
  </View>
);

export default PlaylistItem;
