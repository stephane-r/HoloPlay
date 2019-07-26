import { connect } from '../../store';
import DialogAddToPlaylist from '../../components/Dialog/AddToPlaylist';

const DialogAddToPlaylistContainer = connect(({ userId }) => ({
  userId
}))(DialogAddToPlaylist);

export default DialogAddToPlaylistContainer;
