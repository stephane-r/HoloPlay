const actions = {
  addAudio: async (state, actions, source) => {
    return {
      ...state,
      source
    };
  }
};

export default actions;
