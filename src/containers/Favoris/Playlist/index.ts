import { connect, Store } from '../../../store';
import FavorisPlaylist from '../../../components/Favoris/List';

const FavorisPlaylistContainer = connect(({ favorisPlaylist }: Store) => ({
  videos: favorisPlaylist?.videos ?? [],
  favorisIds: favorisPlaylist?.videos.map((v) => v.videoId) ?? [],
  setPlaylistFrom: 'favoris',
  isFavoris: true
}))(FavorisPlaylist);

export default FavorisPlaylistContainer;
