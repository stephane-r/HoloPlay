import callApi from '../../utils/callApi';
import config from 'react-native-config';
import { ApiRoutes } from '../../constants';
import { Video, Playlist, VideoThumbnail } from '../../types';
import { getState, Store } from '../../store';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getPlaylist, setIsLastPlay } from '../utils';

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
  // showPlayer: async (store: Store): Promise<Store> => ({
  //   ...store,
  //   playerIsOpened: store.video !== null
  // }),
  // hidePlayer: async (store: Store): Promise<Store> => ({
  //   ...store,
  //   playerIsOpened: false
  // }),
  // loadVideo: async (
  //   store: Store,
  //   actions: any,
  //   {
  //     videoIndex,
  //     setPlaylistFrom
  //   }: { videoIndex: number; setPlaylistFrom: undefined | PlaylistOrigin }
  // ): Promise<PlayerState> => {
  //   const playlist = await getPlaylist(setPlaylistFrom);
  //   const isLastVideo = playlist.length === videoIndex;
  //   // If is last video, we restart the playlist from first index
  //   const video: Video = isLastVideo ? playlist[0] : playlist[videoIndex];
  //   const data = await callApi({ url: ApiRoutes.VideoId(video.videoId) });

  //   const videoUpdated = {
  //     ...video,
  //     ...data,
  //     uri: data.liveNow
  //       ? `${config.YOUTUBE_AUDIO_SERVER_API_URL}/${data.videoId}`
  //       : data.adaptiveFormats.find(
  //           ({ type }: any) => type === 'audio/webm; codecs="opus"'
  //         ).url,
  //     thumbnail: data.videoThumbnails.find(
  //       ({ quality }: VideoThumbnail) => quality === 'medium'
  //     )
  //   };

  //   const lastPlays = setIsLastPlay(video, store.lastPlays);

  //   return {
  //     ...store,
  //     video: videoUpdated,
  //     videoIndex: videoIndex,
  //     lastPlays,
  //     playlist
  //   };
  // },
  loadLiveVideo: async (
    store: Store,
    actions: any,
    {
      videoIndex,
      data,
      setPlaylistFrom
    }: {
      videoIndex: number;
      data: Video;
      setPlaylistFrom: undefined | PlaylistOrigin;
    }
  ): Promise<PlayerState> => {
    const playlist = await getPlaylist(setPlaylistFrom);
    const isLastVideo = playlist.length === videoIndex;
    // If is last video, we restart the playlist from first index
    const video: Video = isLastVideo ? playlist[0] : playlist[videoIndex];

    const videoUpdated = {
      ...video,
      ...data,
      uri: `${config.YOUTUBE_AUDIO_SERVER_API_URL}/${data.videoId}`,
      thumbnail: data.videoThumbnails.find(
        ({ quality }: VideoThumbnail) => quality === 'medium'
      )
    };

    const lastPlays = setIsLastPlay(video, store.lastPlays);

    return {
      ...store,
      video: videoUpdated,
      videoIndex: videoIndex,
      lastPlays,
      playlist
    };
  },
  // paused: async (store: Store): Promise<Store> => ({
  //   ...store,
  //   paused: !store.paused
  // }),
  // repeat: async (store: Store): Promise<Store> => ({
  //   ...store,
  //   repeat: !store.repeat
  // }),
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
