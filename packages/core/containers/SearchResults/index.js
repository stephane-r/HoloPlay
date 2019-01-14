import { connect } from '@youtube-audio-player/core';
import { Result } from '@youtube-audio-player/components';

const SearchResultContainer = connect(({ results }) => ({
  results
}))(Result);

export default SearchResultContainer;
