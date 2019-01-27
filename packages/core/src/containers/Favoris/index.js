import { connect } from '@youtube-audio-player/core';
import { ResultList } from '@youtube-audio-player/components';

const FavorisContainer = connect(({ user }) => {
  if (user) {
    const results = user.favoris;

    return {
      results,
      isFavoris: true
    };
  }

  return {
    results: []
  };
})(ResultList);

export default FavorisContainer;
