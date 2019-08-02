import { connect } from '../../store';
import Favoris from '../../components/Favoris';

const FavorisContainer = connect(({ userId }) => ({
  userId
}))(Favoris);

export default FavorisContainer;
