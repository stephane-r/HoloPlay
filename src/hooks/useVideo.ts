import { ApiRoutes } from '../constants';
import callApi from '../utils/callApi';
import { actions } from '../store';
import Video from 'react-native-video';
import useStore from './useStore';

const useVideo = () => {
  const store = useStore();

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

    return actions.setFlashMessage({
      message: `${video.title} has been added to your playlist`
    });

    return actions.setFlashMessage({
      message: 'You need to select a playlist'
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

    return actions.setFlashMessage({
      message: `${videoIndexId} has been removed`
    });
  };

  return {
    addVideoToPlaylist,
    removeVideo
  };
};

export default useVideo;
