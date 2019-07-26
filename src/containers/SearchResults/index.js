import { connect } from '../../store';
import ResultList from '../../components/Result/List';

const SearchResultContainer = connect(({ results }) => ({
  data: results ? results : null
}))(ResultList);

export default SearchResultContainer;
