import getYoutubeContentDetail from '../../utils/youtubeContentDetail';

const audioState = {
  playerIsOpened: false,
  source: null,
  sourceIndex: null,
  repeat: false,
  paused: false,
  duration: 0,
  playlist: []
};

const audioActions = {
  showPlayer: async state => {
    if (state.source) {
      return {
        ...state,
        playerIsOpened: true
      };
    }

    return state;
  },
  hidePlayer: async state => {
    return {
      ...state,
      playerIsOpened: false
    };
  },
  setPlaylistFrom: async (state, actions, origin) => {
    let playlistList;

    switch (true) {
      case origin === 'searchResults':
        playlistList = state.results;
        break;
      case typeof origin === 'object':
        playlistList = origin;
        break;
    }

    if (origin.videoId) {
      playlistList = origin.videos;
    }

    return {
      ...state,
      playlist: playlistList
    };
  },
  loadSource: async (state, actions, sourceIndex) => {
    try {
      const { playlist } = state;
      const isLastSource = playlist.length === sourceIndex - 2;
      // If is last source, we restart the playlist from first index
      const source = isLastSource ? playlist[0] : playlist[sourceIndex];
      const data = await getYoutubeContentDetail(source.videoId);
      const audio = {
        ...source,
        ...data,
        uri: data.adaptiveFormats.find(
          ({ type }) => type === 'audio/webm; codecs="opus"'
        ).url,
        thumbnail: data.videoThumbnails.find(
          ({ quality }) => quality === 'medium'
        )
      };

      return {
        ...state,
        source: audio,
        sourceIndex
      };
    } catch (error) {
      alert(error);
      return state;
    }
  },
  paused: async state => {
    return {
      ...state,
      paused: !state.paused
    };
  },
  repeat: async state => {
    return {
      ...state,
      repeat: !state.repeat
    };
  }
};

export { audioActions, audioState };
