import React, { useMemo, memo } from 'react';
import { useQuery } from 'react-query';
import DataEmpty from '../../Data/Empty';
import search from '../../../queries/search';
import SearchError from '../Error';
import SearchEmpty from '../Empty';
import { useSearch } from '../../../providers/Search';
import { CardList, GridListPlaceholder } from '../../CardList';
import { useData } from '../../../providers/Data';
import { useSnackbar } from '../../../providers/Snackbar';
import { useAppSettings } from '../../../providers/App';

export const SearchResult: React.FC = memo(() => {
  const { data: dataActions } = useData();
  const { state } = useSearch();
  const { settings } = useAppSettings();
  const snackbar = useSnackbar();
  const apiUrl = useMemo(
    () =>
      state.searchValue === ''
        ? 'popular'
        : `search?q=${state.searchValue}&type=${state.searchType}`,
    [state.searchValue, state.searchType]
  );
  const {
    isLoading: loading,
    error,
    data
  } = useQuery(apiUrl, {
    queryFn: () => search(apiUrl, settings.instance),
    onSuccess: dataReceive => {
      dataActions.receiveData({
        key: 'search',
        data: dataReceive
      });
    },
    onError: ({ message }) => snackbar.show(message)
  });

  if (loading) {
    return <GridListPlaceholder />;
  }

  if (error || !Array.isArray(data)) {
    return <Error />;
  }

  if (data.length === 0) {
    return <Empty />;
  }

  return <CardList data={data} display="grid" setPlaylistFrom="search" />;
});

const Error = memo(() => {
  return (
    <DataEmpty>
      <SearchError />
    </DataEmpty>
  );
});

const Empty = memo(() => {
  const { state } = useSearch();

  return (
    <DataEmpty>
      <SearchEmpty value={state.searchValue} />
    </DataEmpty>
  );
});
