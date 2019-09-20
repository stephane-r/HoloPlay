import { connect } from '../../store';
import Search from '../../components/Search';

const SearchContainer = connect(({ history }) => ({
  history: history.reverse()
}))(Search);

export default SearchContainer;
