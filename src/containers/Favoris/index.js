import { connect } from '../../store';
import ResultList from '../../components/Result/List';

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
