import React, { useEffect } from 'react';
import { IconButton, Button, useTheme } from 'react-native-paper';
import { actions } from '../../../store';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import { Video, Playlist } from '../../../types';
import useFavoris from '../../../hooks/useFavoris';
import { Alert, CheckBox } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Props {
  favorisPlaylist: Playlist;
  favorisIds: string[];
  videoId: string;
  buttonWithIcon: boolean;
  size?: number;
  color?: string;
}

const Favoris: React.FC<Props> = ({
  favorisPlaylist,
  favorisIds,
  video,
  buttonWithIcon,
  size = 25,
  color
}) => {
  const { colors, dark } = useTheme();
  const { addToFavoris, removeFromFavoris } = useFavoris();
  const { t } = useTranslation();

  useEffect(() => {}, []);

  const addOrRemoveToFavoris = (): void => {
    if (isFavoris) {
      const videoFinded: Video = favorisPlaylist.videos.find(
        v => v.videoId === video.videoId
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
    color: isFavoris ? colors.favoris : dark ? colors.primary : color
  };

  if (buttonWithIcon) {
    return (
      <Button {...iconColor} uppercase={false} onPress={addOrRemoveToFavoris}>
        {t('navigation.favoris')}
      </Button>
    );
  }

  return (
    <IconButton
      {...iconColor}
      accessibilityStates={[]}
      size={size}
      onPress={addOrRemoveToFavoris}
      animated
    />
  );
};

Favoris.defaultProps = {
  buttonWithIcon: false
};

export default Favoris;
