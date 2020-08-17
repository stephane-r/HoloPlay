import { v4 as uuiv4 } from 'uuid';
import callApi from '../utils/callApi';
import { FAVORIS_PLAYLIST_TITLE, ApiRoutes } from '../constants';
import { actions } from '../store';
import useStore from './useStore';
import { Playlist } from '../types';
import Video from 'react-native-video';

const useFavoris = () => {
  const store = useStore();

  const createFavorisPlaylist = async () => {
    const favorisPlaylist = {
      title: FAVORIS_PLAYLIST_TITLE,
      privacy: 'public'
    };

    if (!store.logoutMode) {
      return actions.addPlaylist({
        ...favorisPlaylist,
        playlistId: uuiv4(),
        videos: []
      });
    }

    try {
      await callApi({
        url: ApiRoutes.Playlists,
        method: 'POST',
        body: favorisPlaylist
      });

      return setTimeout(
        () =>
          actions.setFlashMessage({ message: `Playlist Favoris was created.` }),
        500
      );
    } catch (error) {
      return setTimeout(
        () =>
          actions.setFlashMessage({ message: `Playlist Favoris not created.` }),
        500
      );
    }
  };

  const addToFavoris = async (playlistId: Playlist, video: Video) => {
    try {
      if (!store.logoutMode) {
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

      return actions.setFlashMessage({ message: 'Added from favoris' });
    } catch (error) {
      return console.log(error);
    }
  };

  const removeFromFavoris = async (playlistId: string, video: Video) => {
    try {
      actions.removeFromFavoris(video.videoId);
      actions.setFlashMessage({ message: 'Removed from favoris' });

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.VideoIndexId(playlistId, video.indexId),
          method: 'DELETE'
        });
      }

      return actions.setFlashMessage({ message: 'Removed from favoris' });
    } catch (error) {
      return console.log(error);
    }
  };

  return {
    createFavorisPlaylist,
    addToFavoris,
    removeFromFavoris
  };
};

export default useFavoris;
