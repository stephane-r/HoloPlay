import { connect } from '../../store';
import ResultSearch from '../../components/Result/List';

const FavorisPlaylistContainer = connect(({ favorisPlaylist }) => ({
  data: favorisPlaylist.videos,
  favorisIds: favorisPlaylist.videos.map(v => v.videoId)
}))(ResultSearch);

export default FavorisPlaylistContainer;
