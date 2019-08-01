import { connect, actions } from '../../store';
import CardSearchItem from '../../components/Card/SearchItem';

const CardSearchItemContainer = connect(({ userId }) => {
  const loadSource = async index => {
    await actions.loadSource(index);

    return actions.showPlayer();
  };

  return {
    onPress: loadSource,
    userId
  };
})(CardSearchItem);

export default CardSearchItemContainer;
