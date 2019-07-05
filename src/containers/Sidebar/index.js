import { connect } from '../../store';
import Sidebar from '../../components/Sidebar';

const SidebarContainer = connect(({ playerIsOpened, source }) => ({
  playerIsOpened,
  source
}))(Sidebar);

export default SidebarContainer;
