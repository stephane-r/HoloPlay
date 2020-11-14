import AsyncStorage from '@react-native-community/async-storage';
import { SearchVideo, Video } from '../../types';
import { Store } from '../../store';

export type SearchTypeTypes = 'video' | 'playlist';

export interface SearchState {
  searchValue: string;
  searchType: SearchTypeTypes;
  results: SearchVideo[];
  popular: SearchVideo[];
  trending: Video[];
  top: SearchVideo[];
  history: string[];
}

const searchState: SearchState = {
  searchValue: '',
  searchType: 'video',
  results: [],
  popular: [],
  trending: [],
  top: [],
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
      searchValue: value,
      history
    };
  },
  setSearchResult: async (
    store: Store,
    actions: any,
    results: SearchVideo[]
  ): Promise<Store> => ({
    ...store,
    results
  }),
  receiveData: (
    store: Store,
    actions: any,
    { key, data }: { key: string; data: SearchVideo[] }
  ) => ({
    ...store,
    [key]: data
  }),
  setSearchType: (
    store: Store,
    actions: any,
    searchType: SearchTypeTypes
  ): Store => ({
    ...store,
    searchType
  }),
};

export { searchActions, searchState };
