import { connect, Store } from '../../store';
import Player from '../../components/Player';

const PlayerContainer = connect(
  ({ video, videoIndex, paused, repeat, playerIsOpened, playlist }: Store) => {
    const nextVideoIndex =
      playlist && playlist.length > 1 ? videoIndex + 1 : null;
    const previousVideoIndex =
      playlist && playlist.length > 1 ? videoIndex - 1 : null;

    return {
      video,
      nextVideoIndex,
      previousVideoIndex,
      paused,
      repeat,
      playerIsOpened,
      isLastVideo: nextVideoIndex === (playlist && playlist.length),
      isFirstVideo: videoIndex === 0
    };
  }
)(Player);

export default PlayerContainer;
