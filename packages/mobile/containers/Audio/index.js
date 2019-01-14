import { connect } from '@youtube-audio-player/core';
import Audio from '../../components/Audio';

const AudioContainer = connect(({ source, paused, repeat }) => ({
  source,
  paused,
  repeat
}))(Audio);

export default AudioContainer;
