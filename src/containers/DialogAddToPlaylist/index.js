import { connect } from '../../store';
import DialogAddToPlaylist from '../../components/Dialog/AddToPlaylist';

const DialogAddToPlaylistContainer = connect(({ user }) => ({
  user
}))(DialogAddToPlaylist);

export default DialogAddToPlaylistContainer;
