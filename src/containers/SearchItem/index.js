import { connect, actions } from '../../store';
import CardSearchItem from '../../components/Card/SearchItem';

const CardSearchItemContainer = connect(() => {
  const loadSource = async index => {
    await actions.setPlaylistFrom('searchResults');
    await actions.loadSource(index);

    return actions.showPlayer();
  };

  return {
    onPress: loadSource
  };
})(CardSearchItem);

export default CardSearchItemContainer;
