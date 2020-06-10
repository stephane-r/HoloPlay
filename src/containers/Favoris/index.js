import { connect } from '../../store';
import Favoris from '../../components/Favoris';

const FavorisContainer = connect(({ favorisPlaylist }) => ({
  favorisPlaylist,
  favorisIds: favorisPlaylist ? favorisPlaylist.videos.map(v => v.videoId) : []
}))(Favoris);

export default FavorisContainer;
