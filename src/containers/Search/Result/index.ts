import { connect, Store } from '../../../store';
import SearchResult from '../../../components/Search/Result';
import { FAVORIS_PLAYLIST_TITLE } from '../../../constants';

const SearchResultContainer = connect(
  ({
    searchValue,
    playlists,
    instance,
    searchType,
    favorisPlaylist,
    popular
  }: Store) => ({
    searchValue,
    playlists: playlists.filter((p) => p.title !== FAVORIS_PLAYLIST_TITLE),
    instance,
    searchType,
    favorisPlaylist,
    setPlaylistFrom: 'searchResult',
    popular
  })
)(SearchResult);

export default SearchResultContainer;
