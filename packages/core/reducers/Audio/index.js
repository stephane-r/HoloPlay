import getYoutubeContentDetail from '../../utils/youtubeContentDetail';

const audioState = {
  source: null,
  repeat: false,
  paused: false,
  duration: 0
};

const audioActions = {
  addSource: async (state, actions, source) => {
    const request = await getYoutubeContentDetail(source.id);
    const duration = request.items[0].contentDetails.duration;
    const audio = {
      ...source,
      duration
    };

    return {
      ...state,
      source: audio
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
