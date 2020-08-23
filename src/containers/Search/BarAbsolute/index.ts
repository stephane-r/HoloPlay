import { connect, Store } from '../../../store';
import SearchbarAbsolute from '../../../components/Search/BarAbsolute';

const SearchbarAbsoluteContainer = connect(({ video }: Store) => ({
  video
}))(SearchbarAbsolute);

export default SearchbarAbsoluteContainer;
