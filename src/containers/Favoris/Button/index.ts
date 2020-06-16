import { connect, Store } from '../../../store';
import FavorisButton from '../../../components/Favoris/Button';

const FavorisButtonContainer = connect(({ favorisPlaylist }: Store) => ({
  favorisPlaylist,
  favorisIds: favorisPlaylist
    ? favorisPlaylist.videos.map((v) => v.videoId)
    : []
}))(FavorisButton);

export default FavorisButtonContainer;
