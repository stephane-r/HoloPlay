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
    return {
      ...state,
      playerIsOpened: true
    };
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
      case origin === 'favoris':
        playlistList = state.user.favoris;
        break;
    }

    if (origin.id) {
      playlistList = origin.sources;
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
      const { duration } = await getYoutubeContentDetail(source.id);
      const audio = {
        ...source,
        duration
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
