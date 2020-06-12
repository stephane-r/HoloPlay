import { connect, Store } from '../../store';
import Playlist from '../../components/Playlist/List';

const PlaylistsContainer = connect(({ playlists }: Store) => ({
  playlists: playlists.filter(p => p.title !== 'favoris')
}))(Playlist);

export default PlaylistsContainer;
