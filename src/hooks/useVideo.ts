import { ApiRoutes } from '../constants';
import callApi from '../utils/callApi';
import { actions } from '../store';
import Video from 'react-native-video';
import useStore from './useStore';
import { useTranslation } from 'react-i18next';

const useVideo = () => {
  const store = useStore();
  const { t } = useTranslation();

  const addVideoToPlaylist = async (
    playlistId: string,
    video: Video,
    callback: () => void
  ): Promise<any> => {
    if (!store.logoutMode) {
      try {
        await callApi({
          url: ApiRoutes.Videos(playlistId),
          method: 'POST',
          body: {
            videoId: video.videoId
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    actions.addToPlaylist({
      playlistId,
      video
    });

    if (callback) {
      callback();
    }

    return actions.setSnackbar({
      message: t('flashMessage.addVideoToPlaylistSuccess', {
        videoName: video.title
      })
    });
  };

  const removeVideo = async (
    videoIndexId: string,
    playlistId: string
  ): Promise<any> => {
    if (!store.logoutMode) {
      try {
        await callApi({
          url: ApiRoutes.VideoIndexId(playlistId, videoIndexId),
          method: 'DELETE'
        });
      } catch (error) {
        console.log(error);
      }
    }

    actions.removeFromPlaylist({
      playlistId: playlistId,
      indexId: videoIndexId
    });

    return actions.setSnackbar({
      message: t('flashMessage.removeVideoFromPlaylistSuccess', {
        videoName: videoIndexId
      })
    });
  };

  return {
    addVideoToPlaylist,
    removeVideo
  };
};

export default useVideo;
