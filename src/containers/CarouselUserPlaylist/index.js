import { connect } from '../../store';
import Carousel from '../../components/Carousel';

const CarouselUserPlaylistContainer = connect(({ user }) => ({
  data: user ? user.playlist : [],
  firstItem: user && user.playlist ? user.playlist.length - 1 : 0
}))(Carousel);

export default CarouselUserPlaylistContainer;
