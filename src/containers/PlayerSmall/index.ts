import { connect, Store } from '../../store';
import PlayerSmall from '../../components/PlayerSmall';

const PlayerSmallContainer = connect(({ video, paused }: Store) => ({
  video,
  paused
}))(PlayerSmall);

export default PlayerSmallContainer;
