import React, { useEffect } from 'react';
import { IconButton, Button } from 'react-native-paper';
import { actions } from '../../../store';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import { Video, Playlist } from '../../../types';

interface Props {
  favorisPlaylist: Playlist;
  favorisIds: string[];
  video: Video;
  buttonWithIcon: boolean;
  color?: string;
}

const Favoris: React.FC<Props> = ({
  favorisPlaylist,
  favorisIds,
  video,
  buttonWithIcon,
  color
}) => {
  useEffect(() => {}, []);

  const addOrRemoveToFavoris = async (): Promise<any> => {
    if (isFavoris) {
      try {
        const video: Video = favorisPlaylist.videos.find(
          (v) => v.videoId === video.videoId
        );

        if (video.indexId) {
          actions.removeFromFavoris(video.videoId);
          actions.setFlashMessage('Removed from favoris');
          await callApi({
            url: ApiRoutes.VideoIndexId(
              favorisPlaylist.playlistId,
              video.indexId
            ),
            method: 'DELETE'
          });
        }

        return actions.setFlashMessage('Removed from favoris');
      } catch (error) {
        return console.log(error);
      }
    }

    try {
      await callApi({
        url: ApiRoutes.Videos(favorisPlaylist.playlistId),
        method: 'POST',
        body: {
          videoId: video.videoId
        }
      });

      actions.addToFavoris(video);

      return actions.setFlashMessage('Added from favoris');
    } catch (error) {
      return console.log(error);
    }
  };

  const isFavoris: boolean = favorisIds.includes(video.videoId);

  const iconColor = {
    icon: isFavoris ? 'heart' : 'heart-outline',
    color: color ?? (isFavoris ? '#EE05F2' : '#607D8B')
  };

  if (buttonWithIcon) {
    return (
      // @ts-ignore
      <Button {...iconColor} uppercase={false} onPress={addOrRemoveToFavoris}>
        Favoris
      </Button>
    );
  }

  return (
    <IconButton
      {...iconColor}
      accessibilityStates={[]}
      size={25}
      onPress={addOrRemoveToFavoris}
      animated
    />
  );
};

Favoris.defaultProps = {
  buttonWithIcon: false
};

export default Favoris;
