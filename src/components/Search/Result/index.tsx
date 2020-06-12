// @flow
import React, { useState, memo, useEffect } from 'react';
import CardList from '../../Card/List';
import useCallApi from '../../../hooks/useCallApi';
import CardSearchItem from '../../Card/SearchItem';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { actions } from '../../../store';
import Playlist from '../../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../../types';

interface Props {
  playlists: PlaylistType[];
  searchValue: string;
  searchType: string;
  setPlaylistFrom: string;
}

const SearchResult: React.FC<Props> = ({
  playlists,
  searchValue,
  searchType,
  setPlaylistFrom
}) => {
  const data: SearchVideo[] = useCallApi(
    searchValue !== ''
      ? `search?q=${searchValue}&type=${searchType}`
      : 'popular'
  );
  const [dialogIsShow, toggleDialog] = useState<boolean>(false);
  const [video, setVideo] = useState<null | Video>(null);

  useEffect(() => {
    if (data) {
      actions.setSearchResult(data);
    }
  }, [data]);

  return (
    <>
      <CardList>
        {data.map((video, index) => {
          const card = {
            title: video.title,
            picture:
              video.videoThumbnails.find((q) => q.quality === 'medium')?.url ??
              '',
            duration: video.lengthSeconds
          };

          return (
            <CardSearchItem
              key={video.videoId}
              card={card}
              video={video}
              setPlaylistFrom={setPlaylistFrom}
              addToPlaylist={(item) => {
                setVideo(item);
                toggleDialog(!dialogIsShow);
              }}
            />
          );
        })}
      </CardList>
      {playlists && (
        <DialogAddVideoToPlaylist
          visible={dialogIsShow}
          toggleDialog={() => toggleDialog(!dialogIsShow)}
          video={video as Video}
          playlists={playlists}
        />
      )}
    </>
  );
};

export default memo(SearchResult);
