import { connect } from '../../store';
import ResultList from '../../components/Result/List';

const SearchResultContainer = connect(({ results, user }) => ({
  results,
  user
}))(ResultList);

export default SearchResultContainer;
