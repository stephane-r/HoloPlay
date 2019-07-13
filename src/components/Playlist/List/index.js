// @flow
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-apollo-hooks';
import CardPlaylist from '../../Card/Playlist';
import Spacer from '../../Spacer';
import GET_USER from '../../../graphql/query/me';

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

const Playlist = ({ playlist, toggleModal }: PlayListType) => {
  const { data, error, loading } = useQuery(GET_USER);

  if (playlist && playlist.length === 0) {
    return <Text>Aucune playlist</Text>;
  }

  return (
    <View>
      <Spacer height={18} />
      {playlist.map((playlist, index) => (
        <CardPlaylist
          key={index}
          alignment="horizontal"
          card={{
            title: playlist.name,
            picture:
              playlist.sources.length === 0
                ? 'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png' // TODO: Replace placeholder ..
                : playlist.sources[0].thumbnails.default.url
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
