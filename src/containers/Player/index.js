import { connect } from '../../store';
import Player from '../../components/Player';

const PlayerContainer = connect(
  ({ source, sourceIndex, paused, repeat, playerIsOpened, playlist }) => {
    const nextSourceIndex =
      playlist && playlist.length > 1 ? sourceIndex + 1 : null;
    const previousSourceIndex =
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
