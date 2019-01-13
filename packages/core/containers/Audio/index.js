import { connect } from '@youtube-audio-player/core';
import { Audio } from '@youtube-audio-player/components';

const AudioContainer = connect(({ source }) => ({
  source
}))(Audio);

export default AudioContainer;
