import React, { useState, memo, useEffect } from 'react';
import CardList from '../../Card/List';
import useCallApi from '../../../hooks/useCallApi';
import CardSearch from '../../Card/Search';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { actions } from '../../../store';
import Playlist from '../../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../../types';
import { Text, useTheme } from 'react-native-paper';

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
  setPlaylistFrom,
  popular
}) => {
  const { data }: SearchVideo[] = useCallApi(
    `search?q=${searchValue}&type=${searchType}`
  );
  const { colors } = useTheme();

  const videos = data?.length > 0 ? data : popular;

  useEffect(() => {
    if (videos) {
      actions.setSearchResult(videos);
    }
  }, [searchValue]);

  if (!Array.isArray(data)) {
    return <Text>No result. Maybe instance is down ?</Text>;
  }

  return (
    <CardList>
      {videos.map((video, index) => (
        <CardSearch
          key={video.videoId}
          loopIndex={index}
          video={video}
          setPlaylistFrom="searchResults"
          favorisButtonColor={colors.screens.search}
        />
      ))}
    </CardList>
  );
};

export default memo(SearchResult);
