import { connect, Store } from '../../store';
import Player from '../../components/Player';

const PlayerContainer = connect(
  ({ video, videoIdex, paused, repeat, playerIsOpened, playlist }: Store) => {
    const nextVideoIndex =
      // @ts-ignore
      playlist && playlist.length > 1 ? videoIdex + 1 : null;
    const previousVideoIndex =
      // @ts-ignore
      playlist && playlist.length > 1 ? videoIdex - 1 : null;

    return {
      video,
      nextVideoIndex,
      previousVideoIndex,
      paused,
      repeat,
      playerIsOpened
    };
  }
)(Player);

export default PlayerContainer;
