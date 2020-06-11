// @flow
import React, { useEffect } from 'react';
import { IconButton, Button } from 'react-native-paper';
import { actions } from '../../store';
import callApi from '../../utils/callApi';
import { ApiRoutes } from '../../constants';

type FavorisProps = {
  source: Object,
  buttonWithIcon: boolean
};

const Favoris = ({ favorisPlaylist, favorisIds, source, buttonWithIcon }) => {
  useEffect(() => {}, []);

  const addOrRemoveToFavoris = async () => {
    if (isFavoris) {
      try {
        const video = favorisPlaylist.videos.find(
          v => v.videoId === source.videoId
        );

        if (video.indexId) {
          actions.removeFromFavoris(source.videoId);
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
          videoId: source.videoId
        }
      });

      actions.addToFavoris(source);

      return actions.setFlashMessage('Added from favoris');
    } catch (error) {
      return console.log(error);
    }
  };

  const isFavoris = favorisIds.includes(source.videoId);

  const iconColor = {
    icon: isFavoris ? 'heart' : 'heart-outline',
    color: isFavoris ? '#EE05F2' : '#607D8B'
  };

  if (buttonWithIcon) {
    return (
      <Button
        {...iconColor}
        size={20}
        uppercase={false}
        animated
        onPress={addOrRemoveToFavoris}>
        Favoris
      </Button>
    );
  }

  return (
    <IconButton
      {...iconColor}
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
