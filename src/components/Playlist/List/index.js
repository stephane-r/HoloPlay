// @flow
import React from 'react';
import { View } from 'react-native';
import CardPlaylist from '../../Card/Playlist';
import Spacer from '../../Spacer';
import { setCardItem } from '../../Carousel';
import DataEmpty from '../../Data/Empty';

type PlayListType = {
  toggleModal: Function
};

const Playlist = ({ playlists, toggleModal }: PlayListType) => {
  if (playlists.length === 0) {
    return <DataEmpty text="No playlist." />;
  }

  return (
    <View>
      <Spacer height={18} />
      {playlists.map((playlist, index) => (
        <CardPlaylist
          key={index}
          alignment="horizontal"
          card={setCardItem(playlist)}
          playlist={{
            ...playlist,
            sources: playlist.videos ? playlist.videos : []
          }}
          toggleModal={toggleModal}
          totalSongs={playlist.videos ? playlist.videos.length : 0}
          playlistId={playlist.playlistId}
        />
      ))}
    </View>
  );
};

export default Playlist;
