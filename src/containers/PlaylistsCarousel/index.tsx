import { connect, Store } from '../../store';
import Carousel from '../../components/Carousel';

const PlaylistsCarouselContainer = connect(({ playlists }: Store) => ({
  playlists: playlists.filter(p => p.title !== 'favoris').slice(0, 5)
}))(Carousel);

export default PlaylistsCarouselContainer;
