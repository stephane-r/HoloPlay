import { connect } from '../../store';
import Audio from '../../components/Audio';

const AudioContainer = connect(({ playerIsOpened }) => ({ playerIsOpened }))(
  Audio
);

export default AudioContainer;
