import React, { useState, memo, useEffect } from 'react';
import CardSearch from '../Card/Search';
import DialogAddVideoToPlaylist from '../Dialog/AddVideoToPlaylist';
import { actions } from '../../store';
import Playlist from '../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../types';
import { Text, Title } from 'react-native-paper';
import Spacer from '../Spacer';
import { View, Dimensions } from 'react-native';
import CardScrollList from '../Card/ScrollList';
import { useTranslation } from 'react-i18next';

interface Props {
  setPlaylistFrom: string;
  videos: Video[];
  title: string;
}

const LastPlays: React.FC<Props> = ({ setPlaylistFrom, videos, title }) => {
  const [dialogIsShow, toggleDialog] = useState<boolean>(false);
  const [video, setVideo] = useState<null | SearchVideo>(null);
  const { t } = useTranslation();

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <>
      <Title style={{ fontSize: 27 }}>{t('search.lastPlays')}</Title>
      <CardScrollList>
        {videos.map((video, index) => (
          <CardSearch
            key={`last-plays-${video.videoId}-${index}`}
            loopIndex={index}
            video={video}
            setPlaylistFrom="lastPlays"
            addToPlaylist={(item) => {
              setVideo(item);
              toggleDialog(!dialogIsShow);
            }}
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

export default memo(LastPlays);
