import { connect, Store } from '../../../store';
import SearchValue from '../../../components/Search/Value';

const SearchValueContainer = connect(({ searchValue, results }: Store) => ({
  value: searchValue,
  resultCount: results.length
}))(SearchValue);

export default SearchValueContainer;
