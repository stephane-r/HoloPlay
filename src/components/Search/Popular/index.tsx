import React, { useState, memo, useEffect } from 'react';
import useCallApi from '../../../hooks/useCallApi';
import CardSearch from '../../Card/Search';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { actions } from '../../../store';
import Playlist from '../../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../../types';
import { Text, Title } from 'react-native-paper';
import Spacer from '../../Spacer';
import { View, Dimensions } from 'react-native';
import CardScrollList from '../../Card/ScrollList';
import { useTranslation } from 'react-i18next';

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
  const { data }: SearchVideo[] = useCallApi(instance, apiUrl, 20);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      actions.receiveData({ key: setPlaylistFrom, data });
    }
  }, [data, instance]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <>
        <Text>{t('search.error')}</Text>
        <Spacer height={20} />
      </>
    );
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
