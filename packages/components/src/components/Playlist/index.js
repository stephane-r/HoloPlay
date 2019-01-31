import React from 'react';
import { Text, View } from 'react-native';

const Playlist = ({ user: { playlist } }) => (
  <View>
    {playlist && playlist.length > 0 ? (
      playlist.map(({ id, name }) => <Text key={id}>{name}</Text>)
    ) : (
      <Text>Aucune playlist</Text>
    )}
  </View>
);

export default Playlist;
