import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { createContext } from 'react';
import Snackbar from '../components/Snackbar';
import { SearchTypeTypes } from '../store/Search';

export const getCachedSearch = async () => {
  try {
    const [searchHistory] = await Promise.all([
      AsyncStorage.getItem('searchHistory')
    ]);

    return {
      history: JSON.parse(searchHistory) ?? []
    };
  } catch (error) {
    console.log(error);
  }
};

const SearchContext = createContext(null);

export const SearchProvider = ({ children, data }) => {
  const [state, setState] = useState({
    searchValue: '',
    searchType: 'video',
    history: [],
    ...data
  });

  const setSearch = useCallback(
    value => {
      setState(prevState => ({ ...prevState, ...value }));
    },
    [setState]
  );

  const value = useMemo(() => ({ state, setSearch }), [state, setSearch]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  const search = useMemo(
    () => ({
      search: async (value: string): void => {
        let history = context.state.history;

        if (value) {
          history = [value, ...history.slice(0, 4)];
          await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
          context.setSearch({ searchValue: value, history });
        }
      },
      receiveData: ({ key, data }): void => {
        context.setSearch({ [key]: data });
      },
      searchType: (searchType: SearchTypeTypes): void => {
        context.setSearch({ searchType });
      }
    }),
    [context]
  );

  return { state: context.state, search };
};
