import YoutubeSearch from '../../utils/youtubeSearch';

const actions = {
  search: async (state, actions, value) => {
    const results = await YoutubeSearch(value);

    return {
      ...state,
      results
    };
  }
};

export default actions;
