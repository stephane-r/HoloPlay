import { connect, Store } from '../../../store';
import SearchResult from '../../../components/Search/Result';
import { FAVORIS_PLAYLIST_TITLE } from '../../../constants';

const SearchResultContainer = connect(
  ({
    searchValue,
    searchType,
  }: Store) => ({
    apiUrl: searchValue === '' ? `popular` : `search?q=${searchValue}&type=${searchType}`,
    searchValue
  })
)(SearchResult);

export default SearchResultContainer;
