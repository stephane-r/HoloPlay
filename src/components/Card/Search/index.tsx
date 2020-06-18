import React, { useState } from 'react';
import { View } from 'react-native';
import timeFormat from 'hh-mm-ss';
import Card from '../Layout';
import FavorisButtonContainer from '../../../containers/Favoris/Button';
import { actions } from '../../../store';
import { SearchVideo, Video } from '../../../types';
import { IconButton } from 'react-native-paper';

interface Props {
  video: SearchVideo;
  addToPlaylist: (video: SearchVideo) => void;
  setPlaylistFrom: string;
  loopIndex?: number;
}

const CardSearch: React.FC<Props> = ({
  video,
  addToPlaylist,
  setPlaylistFrom,
  loopIndex
}) => {
  const [loading, setLoading] = useState(false);

  const loadVideo = async (index: number): Promise<any> => {
    try {
      setLoading(true);
      await actions.setPlaylistFrom(setPlaylistFrom);
      await actions.loadVideo(index);
      actions.showPlayer();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const card = {
    title: video.title,
    picture:
      video.videoThumbnails.find((q) => q.quality === 'medium')?.url ?? '',
    duration: timeFormat.fromS(video.lengthSeconds),
    liveNow: video.liveNow
  };

  return (
    <Card
      card={card}
      onPress={() => loadVideo(video.index || loopIndex)}
      alignment="vertical"
      isLoading={loading}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          margin: -8
        }}>
        <FavorisButtonContainer video={video} buttonWithIcon />
        <IconButton
          icon="plus"
          accessibilityStates={[]}
          size={22}
          onPress={() => addToPlaylist(video)}
        />
      </View>
    </Card>
  );
};

export default CardSearch;
