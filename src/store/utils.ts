import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import { getState } from '.';
import { FAVORIS_PLAYLIST_TITLE } from '../constants';

type PlaylistOrigin =
  | 'searchResult'
  | 'popular'
  | 'trending'
  | 'lastPlays'
  | 'favoris';

export const getPlaylist = async (
  origin: undefined | PlaylistOrigin | Video
): void => {
  const store = await getState();

  if (origin === undefined) {
    return store.playlist;
  }

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
        p => p.title === FAVORIS_PLAYLIST_TITLE
      )?.videos;
      break;
    case typeof origin === 'object':
      playlistList = origin;
      break;
  }

  if (origin.videoId) {
    playlistList = origin.videos;
  }

  return playlistList;
};

export const setIsLastPlay = (video: Video, lastPlays: Video[]) => {
  const lastPlayVideo = lastPlays[0];
  const isAlreadyLastPlay =
    (video.videoId || video) === (lastPlayVideo.videoId || lastPlayVideo.id);

  if (isAlreadyLastPlay) {
    return lastPlays;
  }

  const lastPlaysUpdated = [video, ...lastPlays.slice(0, 9)];
  AsyncStorage.setItem('lastPlays', JSON.stringify(lastPlaysUpdated));

  return lastPlaysUpdated;
};
