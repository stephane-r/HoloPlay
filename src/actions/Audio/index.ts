import callApi from '../../utils/callApi';
import { ApiRoutes } from '../../constants';
import { Video, Playlist, VideoThumbnail } from '../../types';
import { Store } from '../../store';

export interface AudioState {
  playerIsOpened: boolean;
  source: null | Video;
  sourceIndex: null | number;
  repeat: boolean;
  paused: boolean;
  duration: number;
  playlist: null | Playlist;
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
  loadSource: async (
    store: Store,
    actions: any,
    videoIndex: number
  ): Promise<AudioState> => {
    try {
      const { playlists } = store;
      const isLastVideo = playlists.length === videoIndex - 2;
      // If is last video, we restart the playlist from first index
      const video: Video = isLastVideo ? playlists[0] : playlists[videoIndex];
      const data = await callApi({ url: ApiRoutes.VideoId(video.videoId) });
      const audio = {
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
        source: audio,
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
