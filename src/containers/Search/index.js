import { connect } from '../../store';
import Search from '../../components/Search';

const SearchContainer = connect(({ history }) => ({
  history
}))(Search);

export default SearchContainer;
