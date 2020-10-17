import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import timeFormat from 'hh-mm-ss';
import Card from '../Layout';
import FavorisButtonContainer from '../../../containers/Favoris/Button';
import { actions } from '../../../store';
import { SearchVideo, Video } from '../../../types';
import { IconButton } from 'react-native-paper';

interface Props {
  video: SearchVideo;
  setPlaylistFrom: string;
  loopIndex?: number;
  favorisButtonColor: null | string;
  containerCustomStyle?: {
    [key: string]: string | number;
  };
  pictureCustomStyle?: {
    [key: string]: string | number;
  };
}

const CardSearch: React.FC<Props> = ({
  video,
  setPlaylistFrom,
  loopIndex,
  favorisButtonColor = null,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const loadVideo = async (index: number): Promise<any> => {
    try {
      setLoading(true);
      await actions.setPlaylistFrom(setPlaylistFrom);
      await actions.loadVideo(index);
    } catch (error) {
      actions.setFlashMessage({
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPlaylistVideo = async (): Promise<any> => {
    try {
      setLoading(true);
      await actions.loadPlaylist(video.playlistId);
      await actions.loadVideo(loopIndex);
    } catch (error) {
      actions.setFlashMessage({
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const card = {
    title: video.title,
    picture:
      video.videoThumbnails?.find((q) => q.quality === 'medium').url ||
      video?.playlistThumbnail,
    duration:
      video.type === 'playlist'
        ? `${video.videos.length} videos`
        : video.lengthSeconds
        ? timeFormat.fromS(video?.lengthSeconds)
        : null,
    liveNow: video.liveNow
  };

  return (
    <Card
      card={card}
      onPress={async () => {
        if (video.type === 'playlist') {
          return loadPlaylistVideo();
        }

        return loadVideo(video.index ?? loopIndex);
      }}
      alignment="vertical"
      isLoading={loading}
      {...props}>
      {video.type !== 'playlist' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            margin: -8
          }}>
          <FavorisButtonContainer
            video={video}
            buttonWithIcon
            color={favorisButtonColor}
          />
          <IconButton
            icon="plus"
            accessibilityStates={[]}
            size={22}
            onPress={() => actions.setVideoDialogAddVideoToPlaylist(video)}
          />
        </View>
      )}
    </Card>
  );
};

export default CardSearch;
