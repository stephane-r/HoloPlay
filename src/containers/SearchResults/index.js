import { connect } from '../../store';
import ResultList from '../../components/Result/List';

const SearchResultContainer = connect(({ isSearching, results }) => ({
  isSearching,
  data: results ? results : null
}))(ResultList);

export default SearchResultContainer;
