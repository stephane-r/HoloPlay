import { connect, Store } from '../../store';
import Player from '../../components/Player';

const PlayerContainer = connect(
  ({
    source,
    sourceIndex,
    paused,
    repeat,
    playerIsOpened,
    playlist
  }: Store) => {
    const nextSourceIndex =
      // @ts-ignore
      playlist && playlist.length > 1 ? sourceIndex + 1 : null;
    const previousSourceIndex =
      // @ts-ignore
      playlist && playlist.length > 1 ? sourceIndex - 1 : null;

    return {
      source,
      nextSourceIndex,
      previousSourceIndex,
      paused,
      repeat,
      playerIsOpened
    };
  }
)(Player);

export default PlayerContainer;
