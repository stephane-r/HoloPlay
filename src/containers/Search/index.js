import { connect } from '../../store';
import Search from '../../components/Search';

const SearchContainer = connect(({ isSearching }) => ({
  isSearching
}))(Search);

export default SearchContainer;
