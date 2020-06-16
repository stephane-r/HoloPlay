import { connect, Store } from '../../store';
import Spacer from '../../components/Spacer';

const CarouselSpacerContainer = connect(({ playlists }: Store) => ({
  height: playlists.length === 0 ? 30 : 90
}))(Spacer);

export default CarouselSpacerContainer;
