import { connect, Store } from '../../../store';
import Searchbar from '../../../components/Search/Bar';

const SearchbarContainer = connect(({ history }: Store) => ({
  history
}))(Searchbar);

export default SearchbarContainer;
