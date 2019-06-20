import { connect } from '../../store';
import DialogAddToPlaylist from '../../components/Dialog/AddToPlaylist';

const defaultValue = {
  value: null,
  name: 'Choose playlist'
};

const DialogAddToPlaylistContainer = connect(({ user }) => {
  return {
    playlist: [defaultValue, ...user.playlist]
  };
})(DialogAddToPlaylist);

export default DialogAddToPlaylistContainer;
