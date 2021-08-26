import { connect, Store } from '../../../store';
import Playlist from '../../../components/Playlist/List';

const PlaylistsContainer = connect(
  ({ playlists, video, logoutMode }: Store) => ({
    playlists: playlists.filter(p => p.title !== 'favoris'),
    playingVideoId: video?.videoId,
    logoutMode
  })
)(Playlist);

export default PlaylistsContainer;
