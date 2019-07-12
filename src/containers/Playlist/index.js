import { connect } from '../../store';
import Playlist from '../../components/Playlist/List';

const PlaylistContainer = connect(({ user }) => ({
  playlist: []
}))(Playlist);

export default PlaylistContainer;
