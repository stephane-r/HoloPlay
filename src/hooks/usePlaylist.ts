import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import callApi from '../utils/callApi';
import { ApiRoutes } from '../constants';
import { actions } from '../store';
import { Playlist } from '../types';
import { useState } from 'react';
import useStore from './useStore';

const usePlaylist = (): void => {
  const store = useStore();

  const createPlaylist = async (
    playlist: Playlist,
    callback: () => void
  ): Promise<any> => {
    const playlistName = playlist.title;

    try {
      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.Playlists,
          method: 'POST',
          body: {
            title: playlist.title,
            privacy: 'public'
          }
        });
      }

      console.log(uuidv4());

      actions.addPlaylist({
        playlistId: uuidv4(),
        title: playlist.title,
        privacy: 'public',
        videos: []
      });
    } catch (error) {
      console.log(error);
    }

    if (callback) {
      callback();
    }

    return setTimeout(
      () =>
        actions.setFlashMessage({ message: `${playlistName} was created.` }),
      500
    );
  };

  const updatePlaylist = async (
    playlist: Playlist,
    callback: () => void
  ): Promise<any> => {
    try {
      // Updating store before because this callApi return an error if success ...
      actions.updatePlaylist({
        ...playlist,
        title: playlist.title
      });
      actions.setFlashMessage({ message: `${playlist.title} was updated.` });

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.PlaylistId(playlist.playlistId),
          method: 'PATCH',
          body: {
            title: playlist.title,
            privacy: 'public'
          }
        });
      }
    } catch (error) {
      console.log(error);
      // actions.setFlashMessage({message: `Error : ${playlist.title} not updated.`});
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const removePlaylist = async (
    playlist: Playlist,
    callback: () => void
  ): Promise<any> => {
    try {
      // Updating store before because this callApi return an error if success ...
      actions.removePlaylist(playlist.playlistId);
      actions.setFlashMessage({
        message: `${playlist.title} has been removed.`
      });

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.PlaylistId(playlist.playlistId),
          method: 'DELETE'
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  return {
    createPlaylist,
    updatePlaylist,
    removePlaylist
  };
};

export default usePlaylist;
