import YoutubeSearch from '../../utils/youtubeSearch';

const searchState = {
  value: null,
  results: []
};

const searchActions = {
  search: async (state, actions, value) => {
    try {
      await actions.setIsSearching();
      const results = await YoutubeSearch(value);
      return { ...state, results };
    } catch (error) {
      actions.setFlashMessage(error);
    }
  }
};

export { searchActions, searchState };
