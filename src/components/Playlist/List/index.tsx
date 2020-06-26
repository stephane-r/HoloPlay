import React from 'react';
import { View } from 'react-native';
import CardPlaylist from '../../Card/Playlist';
import Spacer from '../../Spacer';
import { setCardItem } from '../../Carousel';
import DataEmpty from '../../Data/Empty';
import { Playlist as PlaylistType } from '../../../types';

interface Props {
  playlists: PlaylistType[];
  playingVideoId: string;
  toggleModal: () => void;
}

const Playlist: React.FC<Props> = ({
  playlists,
  playingVideoId,
  toggleModal
}) => {
  if (playlists.length === 0) {
    return <DataEmpty text="No playlist." />;
  }

  return (
    <View>
      <Spacer height={18} />
      {playlists.map((playlist) => (
        <CardPlaylist
          key={playlist.playlistId}
          playlist={playlist}
          toggleModal={toggleModal}
          totalSongs={playlist.videos?.length ?? 0}
          playingVideoId={playingVideoId}
        />
      ))}
    </View>
  );
};

export default Playlist;
