// @flow
import React, { useEffect } from 'react';
import { IconButton, Button } from 'react-native-paper';
import useStore from '../../hooks/useStore';
import { actions } from '../../store';

type FavorisProps = {
  source: Object,
  buttonWithIcon: boolean
};

const Favoris = ({ favorisPlaylist, favorisIds, source, buttonWithIcon }) => {
  const store = useStore();

  useEffect(() => {}, []);

  const addOrRemoveToFavoris = async () => {
    if (isFavoris) {
      try {
        const video = favorisPlaylist.videos.find(
          v => v.videoId === source.videoId
        );

        if (video.indexId) {
          actions.removeFromFavoris(source.videoId);

          await fetch(
            `${store.instance}/api/v1/auth/playlists/${
              favorisPlaylist.playlistId
            }/videos/${video.indexId}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${store.token}`
              }
            }
          );
        }

        return actions.setFlashMessage('Removed from favoris');
      } catch (error) {
        return console.log(error);
      }
    }

    try {
      await fetch(
        `${store.instance}/api/v1/auth/playlists/${
          favorisPlaylist.playlistId
        }/videos`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${store.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            videoId: source.videoId
          })
        }
      );

      actions.addToFavoris(source);

      return actions.setFlashMessage('Added from favoris');
    } catch (error) {
      return console.log(error);
    }
  };

  const isFavoris = favorisIds.includes(source.videoId);

  if (buttonWithIcon) {
    return (
      <Button
        icon={isFavoris ? 'favorite' : 'favorite-border'}
        color={isFavoris ? '#EE05F2' : '#607D8B'}
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
      icon={isFavoris ? 'favorite' : 'favorite-border'}
      color={isFavoris ? '#EE05F2' : '#607D8B'}
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
