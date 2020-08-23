import React, { useState, memo, useEffect } from 'react';
import useCallApi from '../../hooks/useCallApi';
import CardSearch from '../Card/Search';
import DialogAddVideoToPlaylist from '../Dialog/AddVideoToPlaylist';
import { actions } from '../../store';
import Playlist from '../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../types';
import { Text, Title } from 'react-native-paper';
import Spacer from '../Spacer';
import { View, Dimensions } from 'react-native';
import CardScrollList from '../Card/ScrollList';

interface Props {
  setPlaylistFrom: string;
  videos: Video[];
  title: string;
}

const LastPlays: React.FC<Props> = ({ setPlaylistFrom, videos, title }) => {
  const [dialogIsShow, toggleDialog] = useState<boolean>(false);
  const [video, setVideo] = useState<null | SearchVideo>(null);

  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <CardScrollList>
        {videos.map((video, index) => (
          <CardSearch
            key={video.videoId}
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
