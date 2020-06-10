import AsyncStorage from '@react-native-community/async-storage';

const searchState = {
  searchValue: '',
  searchType: 'video',
  results: [],
  isSearching: true,
  history: []
};

const searchActions = {
  search: async (state, actions, value) => {
    let history = state.history;

    if (value) {
      history = [value, ...history.slice(0, 4)];
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    }

    return {
      ...state,
      isSearching: false,
      searchValue: value,
      history
    };
  },
  setSearchResult: async (state, actions, results) => {
    return {
      ...state,
      results
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
