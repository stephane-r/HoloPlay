import { connect } from '../../store';
import Carousel from '../../components/Carousel';

const CarouselUserPlaylistContainer = connect(({ user }) => {
  return {
    data: user.playlist,
    firstItem: user.playlist.length - 1
  };
})(Carousel);

export default CarouselUserPlaylistContainer;
