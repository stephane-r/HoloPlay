import getYoutubeContentDetail from '../../utils/youtubeContentDetail';

const audioState = {
  source: null,
  sourceIndex: null,
  repeat: false,
  paused: false,
  duration: 0,
  playlist: []
};

const audioActions = {
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
