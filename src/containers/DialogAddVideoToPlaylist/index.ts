import { connect, Store, actions } from '../../store';
import DialogAddVideoToPlaylist from '../../components/Dialog/AddVideoToPlaylist';
import { Playlist } from '../../types';
import { FAVORIS_PLAYLIST_TITLE } from '../../constants';

const DialogAddVideoToPlaylistContainer = connect(
  ({ playlists, dialogAddVideoToPlaylist }: Store) => ({
    visible: dialogAddVideoToPlaylist.isOpen,
    video: dialogAddVideoToPlaylist.video,
    toggleDialog: actions.toggleDialogAddVideoToPlaylist,
    playlists: playlists.filter(
      (p: Playlist) => p.title !== FAVORIS_PLAYLIST_TITLE
    )
  })
)(DialogAddVideoToPlaylist);

export default DialogAddVideoToPlaylistContainer;
