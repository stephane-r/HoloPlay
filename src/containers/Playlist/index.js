import { connect } from '../../store';
import Playlist from '../../components/Playlist/List';

const PlaylistContainer = connect(({ user }) => ({
  user
}))(Playlist);

export default PlaylistContainer;
