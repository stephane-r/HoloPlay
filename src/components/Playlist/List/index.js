// @flow
import React from 'react';
import { Text, View } from 'react-native';
import CardPlaylist from '../../Card/Playlist';

type PlaylistType = {
  id: string,
  name: string,
  sources: Array<Object>
};

type FavorisType = {};

type UserType = {
  username: string,
  email: string,
  favoris: Array<FavorisType>,
  playlist: Array<PlaylistType>
};

type PlayListType = {
  user: UserType,
  toggleModal: Function
};

const Playlist = ({ user: { playlist }, toggleModal }: PlayListType) => {
  if (playlist && playlist.length === 0) {
    return <Text>Aucune playlist</Text>;
  }

  return (
    <View>
      {playlist.map((playlist, index) => (
        <CardPlaylist
          key={index}
          alignment="horizontal"
          card={{
            title: playlist.name,
            picture: 'https://picsum.photos/200/100'
          }}
          playlist={playlist}
          toggleModal={toggleModal}
          totalSongs={playlist.sources.length}
          playlistId={playlist.id}
        />
      ))}
    </View>
  );
};

export default Playlist;
