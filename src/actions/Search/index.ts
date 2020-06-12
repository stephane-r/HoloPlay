import AsyncStorage from '@react-native-community/async-storage';
import { SearchVideo } from '../../types';
import { Store } from '../../store';

export interface SearchState {
  searchValue: string;
  searchType: 'video';
  results: SearchVideo[];
  isSearching: boolean;
  history: string[];
}

const searchState: SearchState = {
  searchValue: '',
  searchType: 'video',
  results: [],
  isSearching: true,
  history: []
};

const searchActions = {
  search: async (store: Store, actions: any, value: string): Promise<Store> => {
    let history = store.history;

    if (value) {
      history = [value, ...history.slice(0, 4)];
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    }

    return {
      ...store,
      isSearching: false,
      searchValue: value,
      history
    };
  },
  setSearchResult: async (
    store: Store,
    actions: any,
    results: SearchVideo[]
  ): Promise<Store> => {
    return {
      ...store,
      results
    };
  },
  setIsSearching: (store: Store): Store => {
    return {
      ...store,
      isSearching: true
    };
  },
  setIsSearched: (store: Store): Store => {
    return {
      ...store,
      isSearching: false
    };
  }
};

export { searchActions, searchState };
