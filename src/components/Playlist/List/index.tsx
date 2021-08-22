import React from 'react';
import { View } from 'react-native';
import CardPlaylist from '../../Card/Playlist';
import Spacer from '../../Spacer';
import { setCardItem } from '../../Carousel';
import DataEmpty from '../../Data/Empty';
import { Playlist as PlaylistType } from '../../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  playlists: PlaylistType[];
  playingVideoId: string;
  toggleModal: () => void;
}

const Playlist: React.FC<Props> = ({
  playlists,
  playingVideoId,
  toggleModal,
  logoutMode
}) => {
  const { t } = useTranslation();

  if (playlists.length === 0) {
    return <DataEmpty text={t('data.empty.playlist')} />;
  }

  return (
    <View>
      <Spacer height={18} />
      {playlists.map(playlist => (
        <CardPlaylist
          key={playlist.playlistId}
          playlist={playlist}
          toggleModal={toggleModal}
          logoutMode={logoutMode}
          totalSongs={playlist.videos?.length ?? 0}
          playingVideoId={playingVideoId}
        />
      ))}
    </View>
  );
};

export default Playlist;
