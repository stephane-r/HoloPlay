import { connect, Store } from '../../store';
import LayoutSpacer from '../../components/LayoutSpacer';

const LayoutSpacerContainer = connect(({ video }: Store) => ({
  video
}))(LayoutSpacer);

export default LayoutSpacerContainer;
