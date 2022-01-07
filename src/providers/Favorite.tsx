import AsyncStorage from '@react-native-community/async-storage';
import { v4 as uuiv4 } from 'uuid';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { createContext } from 'react';
import Snackbar from '../components/Snackbar';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../constants';
import { SearchTypeTypes } from '../store/Search';
import { Playlist, Video } from '../types';
import callApi from '../utils/callApi';
import { useAppSettings } from './App';
import { usePlaylist } from './Playlist';
import { useSnackbar } from './Snackbar';

const FavoriteContext = createContext(null);

export const FavoriteProvider = ({ children, data }) => {
  const [state, setState] = useState({
    favorisPlaylist: null,
    favoriteIds: [],
    ...data
  });

  const setPlaylist = useCallback(
    value => {
      setState(prevState => ({
        ...prevState,
        ...value,
        favoriteIds: value.favorisPlaylist?.videos.map(v => v.videoId) ?? []
      }));
    },
    [setState]
  );

  const value = useMemo(() => ({ state, setPlaylist }), [state, setPlaylist]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

const DEFAULT_FAVORITE_PLAYLIST = {
  title: FAVORIS_PLAYLIST_TITLE,
  privacy: 'public'
};

const FAVORITE_PLAYLIST = {
  ...DEFAULT_FAVORITE_PLAYLIST,
  playlistId: uuiv4(),
  videos: []
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  const { state: playlistState, playlist: playlistsActions } = usePlaylist();
  const { settings } = useAppSettings();
  const snackbar = useSnackbar();

  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }

  const favorite = useMemo(
    () => ({
      init: async () => {
        try {
          if (!settings.logoutMode) {
            await callApi({
              url: ApiRoutes.Playlists,
              method: 'POST',
              body: DEFAULT_FAVORITE_PLAYLIST
            });
          }

          context.setPlaylist({ favorisPlaylist: FAVORITE_PLAYLIST });
          playlistsActions.set([...playlistState.playlists, FAVORITE_PLAYLIST]);
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      add: async (video: Video): void => {
        try {
          if (!settings.logoutMode) {
            await callApi({
              url: ApiRoutes.Videos(playlistId),
              method: 'POST',
              body: {
                videoId: video.videoId
              }
            });
          }

          const { playlistId } = context.state.favorisPlaylist;
          const favorisPlaylist = {
            ...context.state.favorisPlaylist,
            videos: [video, ...(context.state.favorisPlaylist?.videos ?? [])]
          };
          let playlists = playlistState.playlists;

          if (settings.logoutMode) {
            playlists.map(p => {
              if (p.title === FAVORIS_PLAYLIST_TITLE) {
                return {
                  ...p,
                  videos: [{ ...video, indexId: uuiv4() }, ...p.videos]
                };
              }

              return p;
            });

            await Promise.all([
              AsyncStorage.setItem('playlists', JSON.stringify(playlists)),
              AsyncStorage.setItem(
                'favorisPlaylist',
                JSON.stringify(favorisPlaylist)
              )
            ]);
          }

          context.setPlaylist({ favorisPlaylist });
          playlistsActions.set(playlists);
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      remove: async (videoId: string): void => {
        try {
          const { playlistId } = context.state.favorisPlaylist;
          const video: Video = context.state.favorisPlaylist.videos.find(
            v => v.videoId === videoId
          );

          if (!settings.logoutMode) {
            await callApi({
              url: ApiRoutes.VideoIndexId(playlistId, video.indexId),
              method: 'DELETE'
            });
          }

          const favorisPlaylist = {
            ...context.state.favorisPlaylist,
            videos: context.state.favorisPlaylist.videos.filter(
              v => v.videoId !== videoId
            )
          };
          let playlists = playlistState.playlists;

          if (settings.logoutMode) {
            playlists = playlists.map(p => {
              if (p.title === FAVORIS_PLAYLIST_TITLE) {
                return {
                  ...p,
                  videos: p.videos.filter(v => v.videoId !== videoId)
                };
              }

              return p;
            });

            await Promise.all([
              AsyncStorage.setItem('playlists', JSON.stringify(playlists)),
              AsyncStorage.setItem(
                'favorisPlaylist',
                JSON.stringify(favorisPlaylist)
              )
            ]);
          }

          context.setPlaylist({ favorisPlaylist });
          playlistsActions.set(playlists);
        } catch (error) {
          snackbar.show(error.message);
        }
      }
    }),
    [context]
  );

  return { state: context.state, favorite };
};
