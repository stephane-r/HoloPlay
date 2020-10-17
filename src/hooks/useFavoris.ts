import { v4 as uuiv4 } from 'uuid';
import callApi from '../utils/callApi';
import { FAVORIS_PLAYLIST_TITLE, ApiRoutes } from '../constants';
import { actions } from '../store';
import useStore from './useStore';
import { Playlist } from '../types';
import Video from 'react-native-video';
import { useTranslation } from 'react-i18next';

const useFavoris = () => {
  const store = useStore();
  const { t } = useTranslation();

  const createFavorisPlaylist = async () => {
    const favorisPlaylist = {
      title: FAVORIS_PLAYLIST_TITLE,
      privacy: 'public'
    };

    if (!store.logoutMode) {
      try {
        await callApi({
          url: ApiRoutes.Playlists,
          method: 'POST',
          body: favorisPlaylist
        });

        return setTimeout(
          () =>
          actions.setFlashMessage({
            message: t('flashMessage.playlistFavorisCreateSuccess')
          }),
          500
          );
      } catch (error) {
        return setTimeout(
          () => actions.setFlashMessage({ message: error.message }),
          500
          );
      }
    }

    return actions.addPlaylist({
      ...favorisPlaylist,
      playlistId: uuiv4(),
      videos: []
    });
  };

  const addToFavoris = async (playlistId: Playlist, video: Video) => {
    try {
      if (!store.logoutMode) {
        console.log(video.videoId);
        await callApi({
          url: ApiRoutes.Videos(playlistId),
          method: 'POST',
          body: {
            videoId: video.videoId
          }
        });

        actions.addToFavoris(video);
      } else {
        actions.addToFavoris({
          ...video,
          indexId: uuiv4()
        });
      }

      return actions.setFlashMessage({
        message: t('flashMessage.addFavorisSuccess')
      });
    } catch (error) {
      return actions.setFlashMessage({
        message: error.message
      });
    }
  };

  const removeFromFavoris = async (playlistId: string, video: Video) => {
    try {
      actions.removeFromFavoris(video.videoId);

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.VideoIndexId(playlistId, video.indexId),
          method: 'DELETE'
        });
      }

      return actions.setFlashMessage({
        message: t('flashMessage.removeFavorisSuccess')
      });
    } catch (error) {
      return actions.setFlashMessage({
        message: error.message
      });
    }
  };

  return {
    createFavorisPlaylist,
    addToFavoris,
    removeFromFavoris
  };
};

export default useFavoris;
