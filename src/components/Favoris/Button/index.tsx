import React, { memo, useEffect } from 'react';
import { IconButton, Button, useTheme } from 'react-native-paper';
import { Video } from '../../../types';
import { useFavorite } from '../../../providers/Favorite';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  video: Video;
  buttonWithIcon: boolean;
  size?: number;
  color?: string;
}

export const ButtonFavorite: React.FC<Props> = memo(
  ({ video, buttonWithIcon = false, size = 25, color }) => {
    const { colors, dark } = useTheme();
    const { state, favorite } = useFavorite();
    const { t } = useTranslation();
    const isFavorite: boolean = state.favoriteIds.includes(video.videoId);

    const handlePress = useCallback((): void => {
      if (isFavorite) {
        return favorite.remove(video.videoId);
      }
      return favorite.add(video);
    }, [video, favorite]);

    const iconProps = useMemo(
      () => ({
        icon: isFavorite ? 'heart' : 'heart-outline',
        color: isFavorite ? colors.favoris : dark ? colors.primary : color
      }),
      [isFavorite, colors, dark, color]
    );

    if (buttonWithIcon) {
      return (
        <Button {...iconProps} uppercase={false} onPress={() => handlePress()}>
          {t('navigation.favoris')}
        </Button>
      );
    }

    return (
      <IconButton
        {...iconProps}
        size={size}
        onPress={() => handlePress()}
        animated
      />
    );
  }
);
