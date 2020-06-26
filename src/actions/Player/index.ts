import callApi from '../../utils/callApi';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../../constants';
import { Video, Playlist, VideoThumbnail } from '../../types';
import { Store } from '../../store';
import { Alert } from 'react-native';

export interface PlayerState {
  playerIsOpened: boolean;
  video: null | Video;
  videoIndex: null | number;
  repeat: boolean;
  paused: boolean;
  duration: number;
  playlist: null | Video[];
}

const playerState: PlayerState = {
  playerIsOpened: false,
  video: null,
  videoIndex: null,
  repeat: false,
  paused: false,
  duration: 0,
  playlist: null
};

const playerActions = {
  showPlayer: async (store: Store): Promise<Store> => ({
    ...store,
    playerIsOpened: store.video !== null
  }),
  hidePlayer: async (store: Store): Promise<Store> => ({
    ...store,
    playerIsOpened: false
  }),
  setPlaylistFrom: async (
    store: Store,
    actions: any,
    origin: any
  ): Promise<Store> => {
    let playlistList;

    switch (true) {
      case origin === 'searchResults':
        playlistList = store.results;
        break;
      case origin === 'favoris':
        playlistList = store.playlists.find(
          (p) => p.title === FAVORIS_PLAYLIST_TITLE
        )?.videos;
        break;
      case typeof origin === 'object':
        playlistList = origin;
        break;
    }

    if (origin.videoId) {
      playlistList = origin.videos;
    }

    return {
      ...store,
      playlist: playlistList
    };
  },
  loadVideo: async (
    store: Store,
    actions: any,
    videoIndex: number
  ): Promise<PlayerState> => {
    const { playlist } = store;
    const isLastVideo = playlist.length === videoIndex;
    // If is last video, we restart the playlist from first index
    const video: Video = isLastVideo ? playlist[0] : playlist[videoIndex];
    const data = await callApi({ url: ApiRoutes.VideoId(video.videoId) });

    if (data.error) {
      return actions.setFlashMessage('Error on load video');
    }

    const videoUpdated = {
      ...video,
      ...data,
      uri: data.adaptiveFormats.find(
        ({ type }: any) => type === 'audio/webm; codecs="opus"'
      ).url,
      thumbnail: data.videoThumbnails.find(
        ({ quality }: VideoThumbnail) => quality === 'medium'
      )
    };

    return {
      ...store,
      video: videoUpdated,
      videoIndex: videoIndex
    };
  },
  paused: async (store: Store): Promise<Store> => ({
    ...store,
    paused: !store.paused
  }),
  repeat: async (store: Store): Promise<Store> => ({
    ...store,
    repeat: !store.repeat
  }),
  loadPlaylist: async (store: Store, actions: any, playlistId: string) => {
    const playlist: Playlist = await callApi({
      url: ApiRoutes.PlaylistId(playlistId)
    });

    return {
      ...store,
      playlist: playlist.videos
    };
  }
};

export { playerActions, playerState };
