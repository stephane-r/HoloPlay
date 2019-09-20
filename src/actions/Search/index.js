import AsyncStorage from '@react-native-community/async-storage';
import YoutubeSearch from '../../utils/youtubeSearch';

const searchState = {
  value: null,
  results: [],
  isSearching: true,
  history: []
};

const searchActions = {
  search: async (state, actions, value) => {
    let history = state.history;

    if (value) {
      history = [...history.slice(0, 4), value];
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    }

    try {
      await actions.setIsSearching();
      const results = await YoutubeSearch(value);
      return { ...state, results, isSearching: false };
    } catch (error) {
      actions.setFlashMessage(error);
    }

    return {
      ...state,
      history
    };
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
