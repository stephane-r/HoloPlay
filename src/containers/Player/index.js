import { connect } from '../../store';
import Player from '../../components/Player';

const PlayerContainer = connect(
  ({ source, sourceIndex, paused, repeat, playerIsOpened, user }) => {
    const nextSourceIndex = sourceIndex + 1;
    const previousSourceIndex = sourceIndex - 1;
    const isFavoris = user && source && user.favorisIds.includes(source.id);

    return {
      source,
      nextSourceIndex,
      previousSourceIndex,
      paused,
      repeat,
      playerIsOpened,
      isFavoris
    };
  }
)(Player);

export default PlayerContainer;
