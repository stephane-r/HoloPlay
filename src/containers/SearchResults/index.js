import { connect } from '../../store';
import ResultSearch from '../../components/Result/Search';

const SearchResultContainer = connect(
  ({ searchValue, playlists, searchType, favorisPlaylist }) => ({
    searchValue,
    playlists,
    searchType,
    favorisPlaylist
  })
)(ResultSearch);

export default SearchResultContainer;
