import callApi from '../../utils/callApi';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../../constants';
import { Video, Playlist, VideoThumbnail } from '../../types';
import { Store } from '../../store';
import { Alert } from 'react-native';

// TODO: Refactoring playlist, source and sourceIndex
export interface AudioState {
  playerIsOpened: boolean;
  source: null | Video;
  sourceIndex: null | number;
  repeat: boolean;
  paused: boolean;
  duration: number;
  playlist: null | Video[];
}

const audioState: AudioState = {
  playerIsOpened: false,
  source: null,
  sourceIndex: null,
  repeat: false,
  paused: false,
  duration: 0,
  playlist: null
};

const audioActions = {
  showPlayer: async (store: Store): Promise<Store> => {
    if (store.source) {
      return {
        ...store,
        playerIsOpened: true
      };
    }

    return store;
  },
  hidePlayer: async (store: Store): Promise<Store> => {
    return {
      ...store,
      playerIsOpened: false
    };
  },
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
  ): Promise<AudioState> => {
    try {
      const { playlist } = store;
      const isLastVideo = playlist.length === videoIndex - 2;
      // If is last video, we restart the playlist from first index
      const video: Video = isLastVideo ? playlist[0] : playlist[videoIndex];
      const data = await callApi({ url: ApiRoutes.VideoId(video.videoId) });
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
        source: videoUpdated,
        sourceIndex: videoIndex
      };
    } catch (error) {
      return store;
    }
  },
  paused: async (store: Store): Promise<Store> => {
    return {
      ...store,
      paused: !store.paused
    };
  },
  repeat: async (store: Store): Promise<Store> => {
    return {
      ...store,
      repeat: !store.repeat
    };
  }
};

export { audioActions, audioState };
