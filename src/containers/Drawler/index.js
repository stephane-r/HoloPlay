import { connect } from '../../store';
import Drawler from '../../components/Drawler';

const DrawlerContainer = connect(({ darkTheme }) => ({
  darkTheme
}))(Drawler);

export default DrawlerContainer;
