import { connect } from '../../store';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';

const DialogAddPlaylistContainer = connect(({ playlistIsFecthing }) => ({
  playlistIsFecthing
}))(DialogAddPlaylist);

export default DialogAddPlaylistContainer;
