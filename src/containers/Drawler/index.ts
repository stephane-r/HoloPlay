import { connect, Store } from '../../store';
import Drawler from '../../components/Drawler';

const DrawlerContainer = connect(({ darkMode }: Store) => ({
  darkMode
}))(Drawler);

export default DrawlerContainer;
