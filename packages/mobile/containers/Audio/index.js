import { connect } from '@youtube-audio-player/core';
import Audio from '../../components/Audio';

const AudioContainer = connect(({ source, sourceIndex, paused, repeat }) => ({
  source,
  sourceIndex,
  paused,
  repeat
}))(Audio);

export default AudioContainer;
