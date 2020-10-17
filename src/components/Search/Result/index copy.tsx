import React, { useState, memo, useEffect } from 'react';
import { useQuery } from 'react-query';
import CardList from '../../Card/List';
import CardSearch from '../../Card/Search';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { actions } from '../../../store';
import Playlist from '../../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../../types';
import { Text, useTheme, Button } from 'react-native-paper';
import Spacer from '../../Spacer';
import DataEmpty from '../../Data/Empty';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import search from '../../../queries/search';
import SearchError from '../Error';
import PlaceholderSearchList from '../../Placeholder/Search';

interface Props {
  playlists: PlaylistType[];
  searchValue: string;
  searchType: string;
  setPlaylistFrom: string;
  popular: PlaylistType[];
  instance: string;
}

const SearchResult: React.FC<Props> = ({
  playlists,
  searchValue,
  searchType,
  setPlaylistFrom,
  popular,
  instance
}) => {
  console.log(`search?q=${searchValue}&type=${searchType}`);
  const { isLoading, error, data } = useQuery(
    `search?q=${searchValue}&type=${searchType}`,
    search
  );
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const videos = data?.length > 0 ? data : [];

  useEffect(() => {
    actions.setSearchResult(videos);
  }, [searchValue, instance]);

  if (isLoading) {
    return <PlaceholderSearchList />;
  }

  if (error || !Array.isArray(data)) {
    return (
      <DataEmpty>
        <SearchError />
      </DataEmpty>
    );
  }

  console.log(videos.length);

  if (videos.length === 0) {
    return (
      <DataEmpty>
        <SearchError />
      </DataEmpty>
    );
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
