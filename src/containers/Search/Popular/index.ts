import { connect, Store } from '../../../store';
import Popular from '../../../components/Search/Popular';

const SearchPopularContainer = connect(({ instance }: Store) => ({
  instance
}))(Popular);

export default SearchPopularContainer;
