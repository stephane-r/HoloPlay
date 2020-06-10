import { connect } from '../../store';
import Playlist from '../../components/Playlist/List';

const PlaylistsContainer = connect(({ playlists }) => ({
  playlists: playlists.filter(p => p.title !== 'favoris')
}))(Playlist);

export default PlaylistsContainer;
