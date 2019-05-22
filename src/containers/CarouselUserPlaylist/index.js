import { connect } from '../../store';
import Carousel from '../../components/Carousel';

const CarouselUserPlaylistContainer = connect(({ user }) => {
  return {
    data: user.playlist
  };
})(Carousel);

export default CarouselUserPlaylistContainer;
