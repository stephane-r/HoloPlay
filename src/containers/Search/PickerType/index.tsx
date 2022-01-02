import React from 'react';
import SearchPickerType from '../../../components/Search/PickerType';
import { memo } from 'react';
import { useSearch } from '../../../providers/Search';

export const SearchPickerTypeContainer = memo(() => {
  const { state, search } = useSearch();

  return (
    <SearchPickerType
      searchType={state.searchType}
      onValueChange={(value: string): void => search.searchType(value)}
    />
  );
});
