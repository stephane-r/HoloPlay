import { connect } from '../../store';
import Sidebar from '../../components/Sidebar';

const SidebarContainer = connect(({ playerIsOpened, source, userId }) => ({
  playerIsOpened,
  source,
  userId
}))(Sidebar);

export default SidebarContainer;
