import React, { useState, memo } from 'react';
import CardList from '../../Card/List';
import { Playlist, Video } from '../../../types';
import CardSearch from '../../Card/Search';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { FAVORIS_PLAYLIST_TITLE } from '../../../constants';

interface Props {
  videos: Video[];
  playlists?: null | Playlist[];
  favorisIds?: string[];
  isFavoris: boolean;
  setPlaylistFrom: string;
}

const defaultValue = {
  value: null,
  name: 'Choose playlist'
};

const ResultList: React.FC<Props> = ({ videos, ...props }) => {
  const [dialogIsShow, toggleDialog] = useState<boolean>(false);
  const [video, setVideo] = useState<null | Video>(null);

  return (
    <>
      <CardList>
        {videos.map((video) => (
          <CardSearch
            isFavoris
            key={video.videoId}
            video={video}
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
          playlists={[defaultValue, ...props.playlists]}
        />
      )}
    </>
  );
};

export default memo(ResultList);
