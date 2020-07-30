import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import { Playlist, Video } from '../../types';
import { Store } from '../../store';
import { Alert } from 'react-native';
import { FAVORIS_PLAYLIST_TITLE } from '../../constants';

export interface DataState {
  playlists: Playlist[];
  favorisPlaylist: null | Playlist;
}

const dataState: DataState = {
  playlists: [],
  favorisPlaylist: null
};

const dataActions = {
  importData: async (store: Store, actions: any, data: any) => ({
    ...store,
    ...data
  }),
  clearData: (store: Store): Store => {
    AsyncStorage.setItem('playlists', JSON.stringify(dataState.playlists));
    AsyncStorage.setItem(
      'favorisPlaylist',
      JSON.stringify(dataState.favorisPlaylist)
    );

    return {
      ...store,
      ...dataState
    };
  },
  receivePlaylists: (
    store: Store,
    actions: any,
    playlists: Playlist[]
  ): Store => ({
    ...store,
    playlists
  }),
  addPlaylist: (store: Store, actions: any, playlist: Playlist): Store => {
    const playlists = [playlist, ...store.playlists];

    if (store.logoutMode) {
      AsyncStorage.setItem('playlists', JSON.stringify(playlists));
    }

    return {
      ...store,
      playlists
    };
  },
  updatePlaylist: (store: Store, actions: any, playlist: Playlist): Store => {
    const playlists = store.playlists.map((p) => {
      if (p.playlistId === playlist.playlistId) {
        return {
          ...p,
          title: playlist.title
        };
      }

      return p;
    });

    if (store.logoutMode) {
      AsyncStorage.setItem('playlists', JSON.stringify(playlists));
    }

    return {
      ...store,
      playlists
    };
  },
  removePlaylist: (store: Store, actions: any, playlistId: string): Store => {
    const playlists = store.playlists.filter(
      (p) => p.playlistId !== playlistId
    );

    if (store.logoutMode) {
      AsyncStorage.setItem('playlists', JSON.stringify(playlists));
    }

    return {
      ...store,
      playlists
    };
  },
  receiveFavorisPlaylist: (
    store: Store,
    actions: any,
    favorisPlaylist: Playlist
  ): Store => {
    if (store.logoutMode) {
      AsyncStorage.setItem('favorisPlaylist', JSON.stringify(favorisPlaylist));
    }

    return {
      ...store,
      favorisPlaylist
    };
  },
  addToPlaylist: (
    store: Store,
    actions: any,
    { playlistId, video }: { playlistId: string; video: Video }
  ): Store => {
    const videoOverrided: Video = {
      ...video,
      indexId: uuidv4()
    };
    const playlists = store.playlists.map((p) => {
      if (p.playlistId === playlistId) {
        console.log({
          ...p,
          videos: [videoOverrided, ...p.videos]
        });
        return {
          ...p,
          videos: [videoOverrided, ...p.videos]
        };
      }

      return p;
    });

    if (store.logoutMode) {
      AsyncStorage.setItem('playlists', JSON.stringify(playlists));
    }

    return {
      ...store,
      playlists
    };
  },
  removeFromPlaylist: (
    store: Store,
    actions: any,
    { playlistId, indexId }: { playlistId: string; indexId: string }
  ): Store => {
    const playlists = store.playlists.map((p) => {
      if (p.playlistId === playlistId) {
        return {
          ...p,
          videos: p.videos.filter((v) => v.indexId !== indexId)
        };
      }

      return p;
    });

    if (store.logoutMode) {
      AsyncStorage.setItem('playlists', JSON.stringify(playlists));
    }

    return {
      ...store,
      playlists
    };
  },
  addToFavoris: (store: Store, actions: any, video: Video): Store => {
    const favorisPlaylist = {
      ...store.favorisPlaylist,
      videos: [video, ...(store.favorisPlaylist?.videos ?? [])]
    };
    let playlists = store.playlists;

    if (store.logoutMode) {
      playlists = playlists.map((p) => {
        if (p.title === FAVORIS_PLAYLIST_TITLE) {
          return {
            ...p,
            videos: [video, ...p.videos]
          };
        }

        return p;
      });
      AsyncStorage.setItem('playlists', JSON.stringify(playlists));
      AsyncStorage.setItem('favorisPlaylist', JSON.stringify(favorisPlaylist));
    }

    return {
      ...store,
      favorisPlaylist,
      playlists
    };
  },
  removeFromFavoris: (store: Store, actions: any, videoId: string): Store => {
    const favorisPlaylist = {
      ...store.favorisPlaylist,
      videos: store.favorisPlaylist.videos.filter((v) => v.videoId !== videoId)
    };
    let playlists = store.playlists;

    if (store.logoutMode) {
      playlists = playlists.map((p) => {
        if (p.title === FAVORIS_PLAYLIST_TITLE) {
          return {
            ...p,
            videos: p.videos.filter((v) => v.videoId !== videoId)
          };
        }

        return p;
      });
      AsyncStorage.setItem('playlists', JSON.stringify(playlists));
      AsyncStorage.setItem('favorisPlaylist', JSON.stringify(favorisPlaylist));
    }

    return {
      ...store,
      favorisPlaylist,
      playlists
    };
  }
};

export { dataState, dataActions };
