import React from 'react';
import { Text, View } from 'react-native';
import Item from '../Item';

const Playlist = ({ user: { playlist }, toggleModal }) => (
  <View>
    {playlist && playlist.length > 0 ? (
      playlist.map((playlist, index) => (
        <Item
          key={index}
          playlist={playlist}
          toggleModal={toggleModal} />
      ))
    ) : (
      <Text>Aucune playlist</Text>
    )}
  </View>
);

export default Playlist;
