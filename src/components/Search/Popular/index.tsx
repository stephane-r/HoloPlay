import React, { useState, memo, useEffect } from 'react';
import { useQuery } from 'react-query';
import CardSearch from '../../Card/Search';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { actions } from '../../../store';
import Playlist from '../../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../../types';
import { Text, Title, Button } from 'react-native-paper';
import Spacer from '../../Spacer';
import { View, Dimensions } from 'react-native';
import CardScrollList from '../../Card/ScrollList';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import search from '../../../queries/search';
import PlaceholderCardHorizontalList from '../../Placeholder/CardCenter';
import SearchError from '../Error';

interface Props {
  playlists: PlaylistType[];
  setPlaylistFrom: string;
  apiUrl: string;
  title: string;
  instance: string;
}

const SearchPopularTop: React.FC<Props> = ({
  setPlaylistFrom,
  apiUrl,
  title,
  instance
}) => {
  const { isLoading, error, data } = useQuery(apiUrl, search);
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (data) {
      actions.receiveData({ key: setPlaylistFrom, data });
    }
  }, [data, instance]);

  if (isLoading) {
    return <PlaceholderCardHorizontalList />;
  }

  if (error || !Array.isArray(data) || data.length === 0) {
    return <SearchError />;
  }

  return (
    <>
      <CardScrollList>
        {data.map((video, index) => (
          <CardSearch
            key={video.videoId}
            loopIndex={index}
            video={video}
            setPlaylistFrom={setPlaylistFrom}
            containerCustomStyle={{
              width: 250,
              paddingTop: 15
            }}
            pictureCustomStyle={{
              height: 130
            }}
          />
        ))}
      </CardScrollList>
    </>
  );
};

export default memo(SearchPopularTop);
