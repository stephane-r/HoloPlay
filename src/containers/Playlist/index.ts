import { connect, Store, actions } from '../../store';
import Video from '../../components/Video';

const PlaylistContainer = connect(({ playlist, video, paused }: Store) => ({
  videos: playlist,
  showRemoveButton: false,
  playingVideoId: video?.videoId,
  paused,
  onPlay: async (videoIndex: number) => actions.loadVideo(videoIndex)
}))(Video);

export default PlaylistContainer;
