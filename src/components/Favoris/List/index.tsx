import React, { useState, memo } from 'react';
import CardList from '../../Card/List';
import PlaceholderCardSearchItem from '../../Placeholder/Card';
import { Playlist, Video } from '../../../types';
import CardSearchItem from '../../Card/SearchItem';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';

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
        {videos.map((video) => {
          const card = {
            title: video.title,
            picture:
              video.videoThumbnails.find((q) => q.quality === 'medium')?.url ??
              '',
            duration: video.lengthSeconds
          };

          return (
            <CardSearchItem
              {...props}
              key={video.videoId}
              card={card}
              video={video}
              addToPlaylist={(item): void => {
                setVideo(item);
                toggleDialog(!dialogIsShow);
              }}
              isFavoris={
                props.isFavoris || props.favorisIds?.includes(video.videoId)
              }
            />
          );
        })}
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

ResultList.defaultProps = {
  isFavoris: false
};

export default memo(ResultList);
