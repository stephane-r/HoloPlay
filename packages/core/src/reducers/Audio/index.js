import getYoutubeContentDetail from '../../utils/youtubeContentDetail';

const audioState = {
  source: null,
  sourceIndex: null,
  repeat: false,
  paused: false,
  duration: 0
};

const audioActions = {
  loadSource: async (state, actions, sourceIndex) => {
    const source = state.results[sourceIndex];
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
  paused: async (state, actions, value) => {
    return {
      ...state,
      paused: !state.paused
    };
  },
  repeat: async (state, actions, value) => {
    return {
      ...state,
      repeat: !state.repeat
    };
  }
};

export { audioActions, audioState };
