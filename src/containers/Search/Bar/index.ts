import { connect, Store } from '../../../store';
import Searchbar from '../../../components/Search/Bar';

const SearchbarContainer = connect(({ history, searchValue }: Store) => ({
  history,
  searchValue
}))(Searchbar);

export default SearchbarContainer;
