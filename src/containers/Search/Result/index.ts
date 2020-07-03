import { connect, Store } from '../../../store';
import SearchResult from '../../../components/Search/Result';
import { FAVORIS_PLAYLIST_TITLE } from '../../../constants';

const SearchResultContainer = connect(
  ({ searchValue, playlists, searchType, favorisPlaylist }: Store) => ({
    searchValue,
    playlists: playlists.filter((p) => p.title !== FAVORIS_PLAYLIST_TITLE),
    searchType,
    favorisPlaylist
  })
)(SearchResult);

export default SearchResultContainer;
