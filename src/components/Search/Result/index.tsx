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
import { useSearch } from '../../../providers/Search';

interface Props {
  apiUrl: string;
  searchValue: string;
  onSuccess: (data: any) => void;
}

export const SearchResult: React.FC<Props> = memo(
  ({ apiUrl, searchValue, onSuccess }) => {
    const { isLoading, error, data } = useQuery(apiUrl, {
      queryFn: search,
      onSuccess: data => onSuccess(data)
    });
    const { colors } = useTheme();
    const { t } = useTranslation();
    const { navigate } = useNavigation();

    if (isLoading) {
      return <PlaceholderSearchList />;
    }

    if (error || !Array.isArray(data)) {
      return <Error />;
    }

    if (data.length === 0) {
      return <Empty />;
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
  }
);

const Error = memo(() => {
  return (
    <DataEmpty>
      <SearchError />
    </DataEmpty>
  );
});

const Empty = memo(() => {
  const { state } = useSearch();

  return (
    <DataEmpty>
      <SearchEmpty value={state.searchValue} />
    </DataEmpty>
  );
});
