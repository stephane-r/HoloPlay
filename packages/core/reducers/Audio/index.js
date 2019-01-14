const audioState = {
  source: null,
  repeat: false,
  paused: false
};

const audioActions = {
  addAudio: async (state, actions, source) => {
    return {
      ...state,
      source
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
