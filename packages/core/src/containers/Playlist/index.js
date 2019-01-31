import { connect } from '@youtube-audio-player/core';
import { Playlist } from '@youtube-audio-player/components';

const PlaylistContainer = connect(({ user }) => ({
  user
}))(Playlist);

export default PlaylistContainer;
