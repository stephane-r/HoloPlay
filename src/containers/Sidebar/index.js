import { Dimensions } from 'react-native';
import { connect } from '../../store';
import Sidebar from '../../components/Sidebar';

const WINDOW_WIDTH = Dimensions.get('window').width;
const FROM_VALUE = WINDOW_WIDTH;
const TO_VALUE = 0;

const SidebarContainer = connect(({ playerIsOpened, source }) => {
  const from = !source ? FROM_VALUE : playerIsOpened ? FROM_VALUE : TO_VALUE;
  const to = playerIsOpened ? TO_VALUE : FROM_VALUE;

  return {
    playerIsOpened,
    from,
    to
  };
})(Sidebar);

export default SidebarContainer;
