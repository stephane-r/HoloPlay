import React, { useState, memo } from 'react';
import CardList from '../../Card/List';
import { Playlist, Video } from '../../../types';
import CardSearch from '../../Card/Search';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { FAVORIS_PLAYLIST_TITLE } from '../../../constants';
import DataEmpty from '../../Data/Empty';
import { Text, Button } from 'react-native-paper';
import Spacer from '../../Spacer';
import useFavoris from '../../../hooks/useFavoris';

interface Props {
  videos: Video[];
  playlists?: null | Playlist[];
  favorisIds?: string[];
  isFavoris: boolean;
  setPlaylistFrom: string;
}

const ResultList: React.FC<Props> = ({ videos, ...props }) => {
  const [dialogIsShow, toggleDialog] = useState<boolean>(false);
  const [video, setVideo] = useState<null | Video>(null);
  const { createFavorisPlaylist } = useFavoris();

  if (!videos) {
    return (
      <DataEmpty>
        <Text accessibilityStates={[]}>Your favoris playlist is not set.</Text>
        <Spacer height={20} />
        <Button onPress={createFavorisPlaylist} theme="#EE05F2">
          Set Favoris playlist
        </Button>
      </DataEmpty>
    );
  }

  if (videos.length === 0) {
    return <DataEmpty text="No favoris." />;
  }

  return (
    <>
      <CardList>
        {videos.map((video, index) => (
          <CardSearch
            isFavoris
            key={video.videoId}
            video={video}
            loopIndex={index}
            setPlaylistFrom={FAVORIS_PLAYLIST_TITLE}
            addToPlaylist={(item): void => {
              setVideo(item);
              toggleDialog(!dialogIsShow);
            }}
          />
        ))}
      </CardList>
      {props.playlists && (
        <DialogAddVideoToPlaylist
          visible={dialogIsShow}
          toggleDialog={() => toggleDialog(!dialogIsShow)}
          video={video}
          playlists={props.playlists}
        />
      )}
    </>
  );
};

export default memo(ResultList);
