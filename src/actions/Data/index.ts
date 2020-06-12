import { Playlist, Video } from '../../types';
import { Store } from '../../store';

export interface DataState {
  playlists: Playlist[];
  favorisPlaylist: null | Playlist;
}

const dataState: DataState = {
  playlists: [],
  favorisPlaylist: null
};

const dataActions = {
  receivePlaylists: (
    store: Store,
    actions: any,
    playlists: Playlist[]
  ): Store => ({
    ...store,
    playlists
  }),
  addPlaylist: (store: Store, actions: any, playlist: Playlist): Store => ({
    ...store,
    playlists: [playlist, ...store.playlists]
  }),
  updatePlaylist: (store: Store, actions: any, playlist: Playlist): Store => ({
    ...store,
    playlists: store.playlists.map((p) => {
      if (p.playlistId === playlist.playlistId) {
        return {
          ...p,
          ...playlist
        };
      }

      return playlist;
    })
  }),
  removePlaylist: (store: Store, actions: any, playlistId: string): Store => ({
    ...store,
    playlists: store.playlists.filter((p) => p.playlistId !== playlistId)
  }),
  receiveFavorisPlaylist: (
    store: Store,
    actions: any,
    favorisPlaylist: Playlist
  ): Store => ({
    ...store,
    favorisPlaylist
  }),
  addToPlaylist: (
    store: Store,
    actions: any,
    { playlistId, video }: { playlistId: string; video: Video }
  ): Store => {
    const playlists = store.playlists.map((p) => {
      if (p.playlistId === playlistId) {
        console.log({
          ...p,
          videos: [video, ...p.videos]
        });
        return {
          ...p,
          videos: [video, ...p.videos]
        };
      }

      return p;
    });

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

    return {
      ...store,
      playlists
    };
  },
  addToFavoris: (store: Store, actions: any, video: Video): Store => ({
    ...store,
    favorisPlaylist: {
      ...store.favorisPlaylist,
      videos: [video, ...(store.favorisPlaylist?.videos ?? [])]
    }
  }),
  removeFromFavoris: (store: Store, actions: any, videoId: string): Store => ({
    ...store,
    favorisPlaylist: {
      ...store.favorisPlaylist,
      videos: store.favorisPlaylist.videos.filter((v) => v.videoId !== videoId)
    }
  })
};

export { dataState, dataActions };
