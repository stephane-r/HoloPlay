import { connect } from '../../store';
import Player from '../../components/Player';

const PlayerContainer = connect(
  ({ source, sourceIndex, paused, repeat, playerIsOpened }) => {
    const nextSourceIndex = sourceIndex + 1;
    const previousSourceIndex = sourceIndex - 1;

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
