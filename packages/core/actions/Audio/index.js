const actions = {
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

export default actions;
