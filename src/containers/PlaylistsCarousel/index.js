import { connect } from '../../store';
import Carousel from '../../components/Carousel';

const PlaylistsCarouselContainer = connect(({ playlists }) => ({
  playlists: playlists.filter(p => p.title !== 'favoris').slice(0, 5)
}))(Carousel);

export default PlaylistsCarouselContainer;
