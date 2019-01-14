import { connect } from '@youtube-audio-player/core';
import Audio from '../../components/Audio';

const AudioContainer = connect(({ source, sourceIndex, paused, repeat }) => {
  const nextSourceIndex = sourceIndex + 1;
  const previousSourceIndex = sourceIndex - 1;

  return {
    source,
    nextSourceIndex,
    previousSourceIndex,
    paused,
    repeat
  };
})(Audio);

export default AudioContainer;
