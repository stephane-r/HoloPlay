import { connect, Store } from '../../../store';
import SearchPickerType from '../../../components/Search/PickerType';

const SearchPickerTypeContainer = connect(({ searchType }: Store) => ({
  searchType
}))(SearchPickerType);

export default SearchPickerTypeContainer;
