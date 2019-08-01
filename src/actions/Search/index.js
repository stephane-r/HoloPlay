import YoutubeSearch from '../../utils/youtubeSearch';

const searchState = {
  value: null,
  results: [],
  isSearching: true
};

const searchActions = {
  search: async (state, actions, value) => {
    try {
      await actions.setIsSearching();
      const results = await YoutubeSearch(value);
      return { ...state, results, isSearching: false };
    } catch (error) {
      actions.setFlashMessage(error);
    }
  },
  setIsSearching: async state => {
    return {
      ...state,
      isSearching: true
    };
  },
  setIsSearched: async state => {
    return {
      ...state,
      isSearching: false
    };
  }
};

export { searchActions, searchState };
