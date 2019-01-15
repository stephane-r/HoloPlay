import YoutubeSearch from '../../utils/youtubeSearch';

const searchState = {
  value: null,
  results: []
};

const searchActions = {
  setSearchValue: async (state, actions, value) => {
    return { ...state, value };
  },
  search: async state => {
    const results = await YoutubeSearch(state.value);
    return { ...state, results };
  }
};

export { searchActions, searchState };
