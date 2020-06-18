import React, { useState, memo, useEffect } from 'react';
import CardList from '../../Card/List';
import useCallApi from '../../../hooks/useCallApi';
import CardSearch from '../../Card/Search';
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
  const [video, setVideo] = useState<null | SearchVideo>(null);

  useEffect(() => {
    if (data) {
      actions.setSearchResult(data);
    }
  }, [data, searchType]);

  return (
    <>
      <CardList>
        {data.map((video, index) => (
          <CardSearch
            key={video.videoId}
            loopIndex={index}
            video={video}
            setPlaylistFrom="searchResults"
            addToPlaylist={(item) => {
              setVideo(item);
              toggleDialog(!dialogIsShow);
            }}
          />
        ))}
      </CardList>
      {video !== null && (
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
