// @flow
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-apollo-hooks';
import CardPlaylist from '../../Card/Playlist';
import Spacer from '../../Spacer';
import GET_USER from '../../../graphql/query/user';

type PlayListType = {
  userId: number,
  toggleModal: Function
};

const Playlist = ({ userId, toggleModal }: PlayListType) => {
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { userId }
  });

  if (loading) {
    return <Text>Chargement des playlist</Text>;
  }

  if (error) {
    return <Text>Error.</Text>;
  }

  return (
    <View>
      <Spacer height={18} />
      {data.user.playlists.map((playlist, index) => (
        <CardPlaylist
          key={index}
          alignment="horizontal"
          card={{
            title: playlist.name,
            picture: playlist.sources
              ? playlist.sources[0].thumbnails.default.url
              : 'https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png' // TODO: Replace placeholder ..
          }}
          playlist={{
            ...playlist,
            sources: playlist.sources ? playlist.sources : []
          }}
          toggleModal={toggleModal}
          totalSongs={playlist.sources ? playlist.sources.length : 0}
          playlistId={playlist.id}
          userId={userId}
        />
      ))}
    </View>
  );
};

export default Playlist;
