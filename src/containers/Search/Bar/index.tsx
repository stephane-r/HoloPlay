import React, { memo } from 'react';
import { SearchBar } from '../../../components/Search/Bar';
import { useSearch } from '../../../providers/Search';

export const SearchbarContainer = memo(() => {
  const { state } = useSearch();

  return <SearchBar history={state.history} searchValue={state.searchValue} />;
});
