import callApi from '../../utils/callApi';
import config from 'react-native-config';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../../constants';
import { Video, Playlist, VideoThumbnail } from '../../types';
import { Store } from '../../store';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export interface PlayerState {
  playerIsOpened: boolean;
  video: null | Video;
  videoIndex: null | number;
  repeat: boolean;
  paused: boolean;
  duration: number;
  playlist: null | Video[];
  lastPlays: Video[];
}

const playerState: PlayerState = {
  playerIsOpened: false,
  video: null,
  videoIndex: null,
  repeat: false,
  paused: false,
  duration: 0,
  playlist: null,
  lastPlays: []
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
      case origin === 'popular':
        playlistList = store.popular;
        break;
      case origin === 'trending':
        playlistList = store.trending;
        break;
      case origin === 'lastPlays':
        playlistList = store.lastPlays;
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
    const isLastVideo = (playlist as Video[]).length === videoIndex;
    // If is last video, we restart the playlist from first index
    const video: Video = isLastVideo ? (playlist as Video[])[0] : (playlist as Video[])[videoIndex];
    const data = await callApi({ url: ApiRoutes.VideoId(video.videoId) });

    // if (data.error) {
    //   return actions.setFlashMessage({ message: data.error });
    // }

    const videoUpdated = {
      ...video,
      ...data,
      uri: data.liveNow
        ? `${config.YOUTUBE_AUDIO_SERVER_API_URL}/${data.videoId}`
        : data.adaptiveFormats.find(
            ({ type }: any) => type === 'audio/webm; codecs="opus"'
          ).url,
      thumbnail: data.videoThumbnails.find(
        ({ quality }: VideoThumbnail) => quality === 'medium'
      )
    };

    const lastPlays = [video, ...store.lastPlays.slice(0, 9)];

    AsyncStorage.setItem('lastPlays', JSON.stringify(lastPlays));

    return {
      ...store,
      video: videoUpdated,
      videoIndex: videoIndex,
      lastPlays
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
