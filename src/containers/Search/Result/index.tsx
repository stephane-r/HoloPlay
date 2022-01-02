import React, { memo } from 'react';
import { connect, Store } from '../../../store';
import { SearchResult } from '../../../components/Search/Result';
import { FAVORIS_PLAYLIST_TITLE } from '../../../constants';
import { useSearch } from '../../../providers/Search';

export const SearchResultContainer = memo(() => {
  const { state, search } = useSearch();

  return (
    <SearchResult
      searchValue={state.searchValue}
      apiUrl={
        state.searchValue === ''
          ? `popular`
          : `search?q=${state.searchValue}&type=${state.searchType}`
      }
      onSuccess={(data: any) => search.receiveData(data)}
    />
  );
});
