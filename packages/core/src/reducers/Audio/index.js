import getYoutubeContentDetail from '../../utils/youtubeContentDetail';

const ORIGIN_RESULTS = 'results';
const ORIGIN_FAVORIS = 'favoris';

const audioState = {
  source: null,
  sourceOrigin: ORIGIN_RESULTS,
  sourceIndex: null,
  repeat: false,
  paused: false,
  duration: 0
};

const audioActions = {
  setSourceOrigin: async (state, actions, sourceOrigin) => {
    return {
      ...state,
      sourceOrigin
    };
  },
  loadSource: async (state, actions, sourceIndex) => {
    const { sourceOrigin } = state;
    let source = null;

    if (sourceOrigin === ORIGIN_FAVORIS) {
      source = state.user.favoris[sourceIndex];
    } else {
      source = state.results[sourceIndex];
    }

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
