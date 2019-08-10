import { connect } from '../../store';
import CardSearchItem from '../../components/Card/SearchItem';

const CardSearchItemContainer = connect(({ userId }) => ({
  userId
}))(CardSearchItem);

export default CardSearchItemContainer;
