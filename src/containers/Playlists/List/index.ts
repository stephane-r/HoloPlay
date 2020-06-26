import { connect, Store } from '../../../store';
import Playlist from '../../../components/Playlist/List';

const PlaylistsContainer = connect(({ playlists, video }: Store) => ({
  playlists: playlists.filter((p) => p.title !== 'favoris'),
  playingVideoId: video?.videoId
}))(Playlist);

export default PlaylistsContainer;
