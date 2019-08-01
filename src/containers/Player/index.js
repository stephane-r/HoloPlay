import { connect } from '../../store';
import Player from '../../components/Player';

const PlayerContainer = connect(
  ({ source, sourceIndex, paused, repeat, playerIsOpened, user, playlist }) => {
    const nextSourceIndex =
      playlist && playlist.length > 1 ? sourceIndex + 1 : null;
    const previousSourceIndex =
      playlist && playlist.length > 1 ? sourceIndex - 1 : null;
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
