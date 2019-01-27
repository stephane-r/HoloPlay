import { connect } from '@youtube-audio-player/core';
import { ResultList } from '@youtube-audio-player/components';

const SearchResultContainer = connect(({ results, user }) => ({
  results,
  user
}))(ResultList);

export default SearchResultContainer;
