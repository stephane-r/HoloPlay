import React from 'react';
import { View } from 'react-native';
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
  const loadVideo = async (index: number): Promise<any> => {
    await actions.setPlaylistFrom(setPlaylistFrom);
    await actions.loadVideo(index);
    return actions.showPlayer();
  };

  const card = {
    title: video.title,
    picture:
      video.videoThumbnails.find((q) => q.quality === 'medium')?.url ?? '',
    duration: video.lengthSeconds
  };

  return (
    <Card
      card={card}
      onPress={() => loadVideo(video.index || loopIndex)}
      alignment="vertical">
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
