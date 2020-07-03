import React, { useEffect } from 'react';
import { IconButton, Button } from 'react-native-paper';
import { actions } from '../../../store';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import { Video, Playlist } from '../../../types';
import useFavoris from '../../../hooks/useFavoris';
import { Alert, CheckBox } from 'react-native';

interface Props {
  favorisPlaylist: Playlist;
  favorisIds: string[];
  videoId: string;
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
  const { addToFavoris, removeFromFavoris } = useFavoris();

  useEffect(() => {}, []);

  const addOrRemoveToFavoris = (): void => {
    if (isFavoris) {
      const videoFinded: Video = favorisPlaylist.videos.find(
        (v) => v.videoId === video.videoId
      );

      if (videoFinded.indexId) {
        return removeFromFavoris(favorisPlaylist.playlistId, videoFinded);
      } else {
        return null;
      }
    }

    return addToFavoris(favorisPlaylist.playlistId, video);
  };

  const isFavoris: boolean = favorisIds.includes(video.videoId);

  const iconColor = {
    icon: isFavoris ? 'heart' : 'heart-outline',
    color: color ?? (isFavoris ? '#EE05F2' : '#607D8B')
  };

  if (buttonWithIcon) {
    return (
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
