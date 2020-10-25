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
import SearchEmpty from '../Empty';

interface Props {
  apiUrl: string;
  searchValue: string;
}

const SearchResult: React.FC<Props> = ({ apiUrl, searchValue }) => {
  const { isLoading, error, data } = useQuery(apiUrl, search);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (data) {
      actions.setSearchResult(data);
    }
  }, [data]);

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

  if (data.length === 0) {
    return (
      <DataEmpty>
        <SearchEmpty value={searchValue} />
      </DataEmpty>
    );
  }

  return (
    <CardList>
      {data.map((video, index) => (
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
