import { connect } from '../../store';
import Drawler from '../../components/Drawler';

const DrawlerContainer = connect(({ darkMode }) => ({
  darkMode
}))(Drawler);

export default DrawlerContainer;
